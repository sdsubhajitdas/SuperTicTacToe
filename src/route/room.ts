import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import { generateRoomNumber } from "../utils/room";
import redisClient from "../redis";
import addSessionCookie from "../middleware/sessionCookie";

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
      masterBoard: Array(9).fill(null)
    }),
    // redisClient.expire(`room:${roomId}`, 3600),
    redisClient.expire(`room:${roomId}`, 600)
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

    const playersInRoom = await redisClient.json_arrlen(
      `room:${roomId}`,
      "$.players"
    );
    if (Array.isArray(playersInRoom) && playersInRoom[0] >= 2) {
      return next(createHttpError(400, "Room not empty"));
    }

    await Promise.all([
      redisClient.json_arrappend(`room:${roomId}`, "$.players", {
        name: playerName,
        sessionId,
      }),
      Array.isArray(playersInRoom) && playersInRoom[0] == 1
        ? redisClient.json_set(`room:${roomId}`, "$.status", "ready")
        : redisClient.json_set(`room:${roomId}`, "$.status", "waiting"),
    ]);

    res.send(await redisClient.json_get(`room:${roomId}`));
  }
);

export default router;
