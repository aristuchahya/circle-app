import { Request, Response } from "express";
import { replyService } from "../services/reply-service";
import { ReplyDto } from "../dto/reply-dto";

class ReplyController {
  async createReply(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      if (!user) return res.status(404).json({ message: "User not found" });
      const body = {
        ...req.body,
        userId: user.id,
      };
      const reply = await replyService.createReply(body);
      res.status(201).json({ message: "Reply created", reply });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async addReply(req: Request, res: Response) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/ReplyDTO"
                    }  
                }
            }
        } 
    */
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      const { content } = req.body;
      const dto: ReplyDto = { content, userId, threadId: Number(id) };
      const reply = await replyService.addReply(dto);
      console.log("create reply", reply);
      res.json(reply);
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
    }
  }

  async countReplies(req: Request, res: Response) {
    try {
      const { threadId } = req.params;

      const reply = await replyService.countReplies(Number(threadId));
      res.json(reply);
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
    }
  }

  async findAllReply(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reply = await replyService.findAll(Number(id));

      res.status(200).json(reply);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async findReply(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reply = await replyService.findBy(Number(id));
      if (!reply) return res.status(404).json({ message: "Reply not found" });
      res.status(200).json({ message: "success", reply });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async deleteReply(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reply = await replyService.findBy(Number(id));
      if (!reply) return res.status(404).json({ message: "Reply not found" });
      const deleteReply = await replyService.deleteReply(Number(id));
      res.status(200).json({ message: "Reply has deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const replyController = new ReplyController();
