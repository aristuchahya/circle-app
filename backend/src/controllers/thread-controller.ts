import { Request, Response } from "express";
import { threadService } from "../services/threads-service";
import { CreateThreadDto } from "../dto/threads-dto";
import { AuthRequest } from "../middlewares/authenticate";

class ThreadsController {
  async findAll(req: Request, res: Response) {
    try {
      const thread = await threadService.getAllThreads();
      res.status(200).json(thread);
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
      return error;
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const body = {
        ...req.body,
        image: req.file.path,
      };
      const userId = req.user?.id;

      // const threadData: CreateThreadDto = ({ image: req.file.path } = req.body);

      const createdThread = await threadService.createThread(body, userId);
      console.log("createdThread result:", createdThread);
      res.status(201).json(createdThread);
    } catch (error) {
      return error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const thread = await threadService.findOneThread(Number(id));
      if (!thread) return res.status(404).json({ message: "Thread not found" });

      const body = {
        ...req.body,
        image: req.file.path,
      };

      const updateThread = await threadService.updateThread(Number(id), body);
      res.status(200).json(updateThread);
    } catch (error) {
      return error;
    }
  }

  async deleteThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadService.findOneThread(Number(id));
      if (!thread) return res.status(404).json({ message: "Thread not found" });
      const deleteThread = await threadService.deleteThread(Number(id));
      res.status(200).json(deleteThread);
    } catch (error) {
      return error;
    }
  }
}

export const threadController = new ThreadsController();
