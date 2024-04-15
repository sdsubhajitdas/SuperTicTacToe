import express, { Router } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import roomRouter from './route/room';
import helmet from "helmet"
import cookieParser from "cookie-parser";
import errorHandler from './middleware/errorHandler';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Starting all the backend API routes with "/api"
const apiRouter = Router();
app.use("/api", apiRouter);

apiRouter.use("/room", roomRouter)

apiRouter.use(errorHandler);

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected`);
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
