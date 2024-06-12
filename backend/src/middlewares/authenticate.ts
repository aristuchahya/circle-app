import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserJWTPayloads } from "../types/auth";

dotenv.config();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* 
  #swagger.security = [{
            "bearerAuth": []
    }] 
            */
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
