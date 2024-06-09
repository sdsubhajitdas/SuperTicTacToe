import { Server } from "socket.io";
import redisClient from "../redis";
import * as _ from "lodash";
import { decideMoveBasedOnSessionId } from "../utils/session";
import {
  checkTicTacToeBoard,
  decideNextMoveBoard,
  decideNextMovePlayer,
} from "../utils/game";

export default function setupSocketIoServer(ioServer: Server) {
  ioServer.on("connection", (socket) => {
    console.log(
      `${socket.id} user connected. Cookie ${socket.client.request.headers.cookie}`
    );

    socket.on("disconnect", (reason, details) => {
      console.log(`${socket.id} user disconnected`);
    });

    socket.on("join-room-initiated", async (roomId, callback) => {
      console.log(`${socket.id} user joined room ${roomId}`);
      socket.join(roomId);
      ioServer
        .to(roomId)
        .emit(
          "join-room-completed",
          await redisClient.json_get(`room:${roomId}`)
        );
    });

    socket.on("player-made-move-initiated", async (moveDetails, callback) => {
      console.log(`Client ${socket.id} made a move`, moveDetails);
      const sessionId = _.get(
        _.get(socket, "client.request.headers.cookie", "").match(
          /sessionId=([^;]+)/
        ),
        "[1]",
        ""
      );
      const { masterBoardIndex, childBoardIndex, roomId } = moveDetails;
      const roomDetails = await redisClient.json_get(`room:${roomId}`);
      let redisPromises = [];

      let boards = _.get(
        roomDetails,
        "boards",
        Array(9).fill(Array(9).fill(null))
      );
      let masterBoard = _.get(roomDetails, "masterBoard", Array(9).fill(null));
      let players = _.get(roomDetails, "players", []) as {
        sessionId: string;
        name: string;
      }[];

      boards[masterBoardIndex][childBoardIndex] = decideMoveBasedOnSessionId(
        sessionId,
        players
      );

      const value = checkTicTacToeBoard(
        _.get(boards, `[${masterBoardIndex}]`, Array(9).fill(null))
      );

      masterBoard[masterBoardIndex] = value;

      const winnerSymbol = checkTicTacToeBoard(masterBoard);
      // If there is a winner then update winner field
      if (winnerSymbol) {
        redisPromises.push(
          redisClient.json_set(
            `room:${roomId}`,
            "$.winner",
            winnerSymbol === "X"
              ? players[0].sessionId
              : winnerSymbol === "O"
                ? players[1].sessionId
                : winnerSymbol
          )
        );
        // Update the board as finished
        redisPromises.push(
          redisClient.json_set(`room:${roomId}`, "$.status", "finished")
        );
      }

      redisPromises.push(
        redisClient.json_set(`room:${roomId}`, "$.boards", boards)
      );

      redisPromises.push(
        redisClient.json_set(`room:${roomId}`, "$.masterBoard", masterBoard)
      );

      redisPromises.push(
        redisClient.json_set(
          `room:${roomId}`,
          "$.nextMovePlayer",
          decideNextMovePlayer(
            _.get(roomDetails, "nextMovePlayer", ""),
            players
          )
        )
      );
      redisPromises.push(
        redisClient.json_set(
          `room:${roomId}`,
          "$.nextMoveBoard",
          decideNextMoveBoard(childBoardIndex, masterBoard)
        )
      );

      redisPromises.push(
        redisClient.json_set(`room:${roomId}`, "$.lastMove", {
          masterBoardIndex,
          childBoardIndex,
        })
      );

      await Promise.all([redisPromises]);

      ioServer
        .to(roomId)
        .emit(
          "player-made-move-completed",
          await redisClient.json_get(`room:${roomId}`)
        );
    });
  });
}
