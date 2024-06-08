import { Request, Response } from "express";
import { threadService } from "../services/threads-service";
import { CreateThreadDto } from "../dto/threads-dto";
import { UserJWTPayloads } from "../types/auth";

class ThreadsController {
  async findAll(req: Request, res: Response) {
    try {
      const thread = await threadService.getAllThreads();

      res.json(thread);
    } catch (error) {
      return error;
    }
  }

  async findThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadService.findOneThread(Number(id));
      if (!thread) return res.status(404).json({ message: "Thread not found" });
      res.status(200).json(thread);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = res.locals.user as UserJWTPayloads;

      if (!user) return res.status(404).json({ message: "User not found" });

      const body = {
        ...req.body,
        image: req.file ? req.file.path : "",
      };

      const createdThread = await threadService.createThread(body, user.id);
      console.log("createdThread result:", createdThread);
      res.status(201).json(createdThread);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const thread = await threadService.findOneThread(Number(id));
      if (!thread) return res.status(404).json({ message: "Thread not found" });

      const user = res.locals.user;

      const body = {
        ...req.body,
        image: req.file.path,
        createdBy: user.id,
      };

      const updateThread = await threadService.updateThread(Number(id), body);
      res.status(200).json({ message: "Thread updated", updateThread });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async deleteThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadService.findOneThread(Number(id));
      if (!thread) return res.status(404).json({ message: "Thread not found" });
      const deleteThread = await threadService.deleteThread(Number(id));
      res.status(200).json({ message: "Thread deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const threadController = new ThreadsController();
