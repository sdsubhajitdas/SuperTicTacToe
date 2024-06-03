import { Server } from "socket.io";
import redisClient from "../redis";
import * as _ from "lodash";
import { decideMoveBasedOnSessionId } from "../utils/session";
import { checkTicTacToeBoard } from "../utils/game";

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
      const roomBoard = await redisClient.json_get(`room:${roomId}`);
      let boards = _.get(roomBoard, "boards");
      let masterBoard = _.get(roomBoard, "masterBoard", Array(9).fill(null))
      let players = _.get(roomBoard, "players", []);
      if (boards) {
        _.set(
          boards,
          `[${masterBoardIndex}][${childBoardIndex}]`,
          decideMoveBasedOnSessionId(sessionId, players)
        );

        const value = checkTicTacToeBoard(
          _.get(boards, `[${masterBoardIndex}]`, Array(9).fill(null))
        )

        // console.log(value);
        _.set(masterBoard, `[${masterBoardIndex}]`, value)
      }

      await redisClient.json_set(`room:${roomId}`, "$.boards", boards);
      await redisClient.json_set(`room:${roomId}`, "$.masterBoard", masterBoard);
      ioServer
        .to(roomId)
        .emit(
          "player-made-move-completed",
          await redisClient.json_get(`room:${roomId}`)
        );
    });
  });
}
