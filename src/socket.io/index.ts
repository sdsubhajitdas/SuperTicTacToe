import { Server } from 'socket.io';
import redisClient from '../redis';

export default function setupSocketIoServer(ioServer: Server) {
  ioServer.on('connection', (socket) => {
    console.log(`${socket.id} user connected. Cookie ${socket.client.request.headers.cookie}`);

    socket.on("disconnect", (reason, details) => {
      console.log(`${socket.id} user disconnected`);
    });


    socket.on("join-room", async (roomId, callback) => {
      console.log(`${socket.id} user joined room ${roomId}`);
      socket.join(roomId);
      ioServer.to(roomId).emit("joined-room", await redisClient.json_get(`room:${roomId}`));
    })

    socket.on("player-made-move", async (moveDetails, callback) => {
      console.log(`Client ${socket.id} made a move`, moveDetails);
    })

  });
}

