import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    console.log("No authorization header or incorrect format");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token verified:", decoded);
    res.locals.user = decoded;
    next();
  } catch (error) {
    // console.log("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
