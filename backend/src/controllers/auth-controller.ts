import { Request, Response } from "express";
import { authService } from "../services/auth";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const user = await authService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      return error;
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      return error;
    }
  }
}

export const authController = new AuthController();
