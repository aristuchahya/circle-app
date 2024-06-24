import { Request, Response } from "express";
import { likeService } from "../services/likes-service";
import { error } from "console";

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
      res.status(201).json(like);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async findAllLike(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      if (isNaN(userId))
        return res.status(404).json({ error: "invalid userId" });
      const like = await likeService.findAll(userId);
      res.status(200).json(like);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async countLike(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const totalLike = await likeService.totalLikeUsers(Number(userId));

      res.json({ totalLike });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async findLike(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const userId = res.locals.user.id;
      const thread = await likeService.findBy(Number(threadId), userId);
      if (!thread) return res.status(404).json({ message: "like not found" });
      res.status(200).json(thread);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async deleteLike(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const { threadId } = req.body;
      const deleteLike = await likeService.deleteLike(userId, threadId);
      res.status(200).json(deleteLike);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const likeController = new LikeController();
