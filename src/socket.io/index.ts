import { Server } from 'socket.io';

export default function setupSocketIoServer(ioServer: Server) {
  ioServer.on('connection', (socket) => {
    console.log(`${socket.id} user connected\n\n`);
    // console.log(socket.client.request.headers.cookie)

    socket.on("joined-room", (args, cb) => {
      console.log(`${socket.id} user joined room`);
      cb("Server ack that you joined room");
    })
  });
}

