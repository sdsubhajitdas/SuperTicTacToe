import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import { generateRoomNumber } from "../utils/room";
import redisClient from "../redis";
import addSessionCookie from "../middleware/sessionCookie";
import * as _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Create a new room
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  let roomId = generateRoomNumber();
  let roomExists = await redisClient.exists(`room:${roomId}`);

  while (roomExists) {
    roomId = generateRoomNumber();
    roomExists = await redisClient.exists(`room:${roomId}`);
  }

  await Promise.all([
    redisClient.json_set(`room:${roomId}`, "$", {
      roomId: roomId,
      status: "allocated",
      players: [],
      boards: Array(9).fill(Array(9).fill(null)),
      masterBoard: Array(9).fill(null),
      nextMovePlayer: null,
      nextMoveBoard: null,
    }),
    // On room creation we set the expiration to 10 mins.
    // When someone joins the room we increase the expiration to env variable
    redisClient.expire(`room:${roomId}`, 600),
  ]);

  res.send(await redisClient.json_get(`room:${roomId}`));
});

// Join already created room
router.post(
  "/join/:roomId",
  addSessionCookie,
  async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.params?.roomId;
    const { playerName } = req.body;
    const sessionId = req.cookies["sessionId"] || "";

    if (!playerName) {
      return next(createHttpError(400, "Please provide a player name"));
    }

    const roomExists = await redisClient.exists(`room:${roomId}`);
    if (!roomExists) {
      return next(createHttpError(404, `Room ${roomId} doesn't exist`));
    }

    const playersInRoomLength = (await redisClient.json_arrlen(
      `room:${roomId}`,
      "$.players"
    )) as unknown as Array<number>;

    const roomDetails = await redisClient.json_get(`room:${roomId}`);

    const playerAlreadyInRoom = _.find(
      _.get(roomDetails, "players", []),
      (player) => _.get(player, "sessionId") === sessionId
    );

    if (
      Array.isArray(playersInRoomLength) &&
      playersInRoomLength[0] >= 2 &&
      !playerAlreadyInRoom
    ) {
      return next(createHttpError(400, "Room not empty"));
    }

    let redisPromises = [];

    if (!playerAlreadyInRoom) {
      // Add new player to room
      redisPromises.push(
        redisClient.json_arrappend(`room:${roomId}`, "$.players", {
          name: playerName,
          sessionId,
        })
      );
      // Set room status when new player joins
      redisPromises.push(
        redisClient.json_set(
          `room:${roomId}`,
          "$.status",
          playersInRoomLength[0] >= 1 ? "ready" : "waiting"
        )
      );

      if (playersInRoomLength[0] == 1) {
        // Set nextMovePlayer when second player joins
        redisPromises.push(
          redisClient.json_set(
            `room:${roomId}`,
            "$.nextMovePlayer",
            _.get(roomDetails, "players[0].sessionId")
          )
        );
        // Set room expiration only when second player joins
        redisPromises.push(
          redisClient.expire(`room:${roomId}`, process.env.ROOM_EXPIRATION || 0)
        );
      }
    }

    await Promise.all(redisPromises);

    res.send(await redisClient.json_get(`room:${roomId}`));
  }
);

export default router;
