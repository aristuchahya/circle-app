import { Request, Response } from "express";
import { likeService } from "../services/likes-service";

class LikeController {
  async createLike(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      if (!user) return res.status(404).json({ message: "User not found" });
      const body = {
        ...req.body,
        userId: user.id,
      };
      const like = await likeService.createLike(body);
      res.status(201).json({ message: "Reply created", like });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async findAllLike(req: Request, res: Response) {
    try {
      const like = await likeService.findAll();
      res.status(200).json({ message: "success", like });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async findLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const like = await likeService.findBy(Number(id));
      if (!like) return res.status(404).json({ message: "like not found" });
      res.status(200).json({ message: "success", like });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async deleteLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const like = await likeService.findBy(Number(id));
      if (!like) return res.status(404).json({ message: "Like not found" });
      const deleteLike = await likeService.deleteLike(Number(id));
      res.status(200).json({ message: "Like has deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const likeController = new LikeController();
