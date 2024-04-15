import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export default function errorHandler(error: HttpError, req: Request, res: Response, next: NextFunction) {
  res.status(error.status).send({
    name: error.name,
    status: error.status,
    message: error.message,
  })
}