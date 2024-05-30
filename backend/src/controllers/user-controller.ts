import { Request, Response } from "express";
import { userService } from "../services/users-service";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      return error;
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      res.status(200).json(user);
    } catch (error) {
      return error;
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const create = await userService.createUser(req.body);
      res.status(201).json(create);
    } catch (error) {
      return error;
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));

      if (!user) return res.status(404).json({ message: "User not found" });

      const update = await userService.updateUser(Number(id), req.body);
      res.status(201).json(update);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (!user) return res.status(404).json({ message: "User not found" });

      const remove = await userService.deleteUser(Number(id));
      res.status(201).json({ message: "User deleted", remove });
    } catch (error) {
      return error;
    }
  }
}

export const userController = new UserController();
