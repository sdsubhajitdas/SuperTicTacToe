import express, { Router, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import roomRouter from "./route/room";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import setupSocketIoServer from "./socket.io";
import dotenv from "dotenv";

dotenv.config();

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
apiRouter.use("/room", roomRouter);

// Express error handler
apiRouter.use(errorHandler);

setupSocketIoServer(ioServer);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  expressApp.use(express.static("client/dist"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  expressApp.get("*", (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
