import { Request, Response, NextFunction } from "express";
import sessionIdGenerator from "../utils/session";
// import { nanoid } from "nanoid";

export default function addSessionCookie(req: Request, res: Response, next: NextFunction) {
  const cookieKey = "sessionId";
  const cookieValue = sessionIdGenerator()
  res.cookie(cookieKey, cookieValue, { maxAge: 3600000, httpOnly: true });

  // Store the cookie value in a custom property of the request object
  req.cookies[cookieKey] = cookieValue;
  next();
}