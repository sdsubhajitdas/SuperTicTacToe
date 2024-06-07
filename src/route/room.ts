import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import { generateRoomNumber } from "../utils/room";
import redisClient from "../redis";
import addSessionCookie from "../middleware/sessionCookie";
import * as _ from "lodash";

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
    // When someone joins the room we increase the expiration to 2 hours
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

    const playersInRoomLength = await redisClient.json_arrlen(
      `room:${roomId}`,
      "$.players"
    );

    const roomDetails = await redisClient.json_get(`room:${roomId}`);

    if (Array.isArray(playersInRoomLength) && playersInRoomLength[0] >= 2) {
      return next(createHttpError(400, "Room not empty"));
    }

    await Promise.all([
      redisClient.json_arrappend(`room:${roomId}`, "$.players", {
        name: playerName,
        sessionId,
      }),
      Array.isArray(playersInRoomLength) && playersInRoomLength[0] == 1
        ? redisClient.json_set(`room:${roomId}`, "$.status", "ready")
        : redisClient.json_set(`room:${roomId}`, "$.status", "waiting"),
      Array.isArray(playersInRoomLength) && playersInRoomLength[0] == 1
        ? redisClient.json_set(
          `room:${roomId}`,
          "$.nextMovePlayer",
          _.get(roomDetails, "players[0].sessionId")
        )
        : redisClient.json_set(`room:${roomId}`, "$.nextMovePlayer", null),
      redisClient.expire(`room:${roomId}`, 7200),
    ]);

    res.send(await redisClient.json_get(`room:${roomId}`));
  }
);

export default router;
