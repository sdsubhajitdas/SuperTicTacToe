import express, { Router } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import roomRouter from './route/room';
import helmet from "helmet"
import cookieParser from "cookie-parser";
import errorHandler from './middleware/errorHandler';
import setupSocketIoServer from './socket.io';

const expressApp = express();
const httpServer = createServer(expressApp);
const ioServer = new Server(httpServer);

expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(cookieParser());

// Starting all the backend API routes with "/api"
const apiRouter = Router();
expressApp.use("/api", apiRouter);

// Setting up routes
apiRouter.use("/room", roomRouter)

// Express error handler
apiRouter.use(errorHandler);


setupSocketIoServer(ioServer);

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
