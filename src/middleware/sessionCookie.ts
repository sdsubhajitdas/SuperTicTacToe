import { Request, Response, NextFunction } from "express";
import sessionIdGenerator from "../utils/session";
import * as _ from "lodash";

export default function addSessionCookie(req: Request, res: Response, next: NextFunction) {
  const existingSessionId = _.get(req.cookies, "sessionId");
  const cookieKey = "sessionId";
  const cookieValue = existingSessionId ? existingSessionId : sessionIdGenerator()
  res.cookie(cookieKey, cookieValue, { maxAge: 3600000, httpOnly: false });

  // Store the cookie value in a custom property of the request object
  req.cookies[cookieKey] = cookieValue;
  next();
}