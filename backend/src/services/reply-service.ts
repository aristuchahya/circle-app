import { PrismaClient } from "@prisma/client";
import { createreplyschema, ReplyDto } from "../dto/reply-dto";

const prisma = new PrismaClient();
class ReplyService {
  async findBy(threadId: number, userId: number) {
    try {
      const thread = await prisma.thread.findUnique({
        where: { id: threadId },
        include: {
          created: {
            select: {
              fullName: true,
              username: true,
            },
          },
          replies: true,
        },
      });

      if (!thread) throw new Error("Thread not found");

      const replyCount = await prisma.reply.count({
        where: { threadId },
      });

      return { ...thread, replyCount };
    } catch (error) {
      return error;
    }
  }

  async findAll(id: number) {
    try {
      const reply = await prisma.reply.findMany({
        where: { threadId: id },
        include: {
          User: {
            select: {
              id: true,
              fullName: true,
              username: true,
              photoProfile: true,
            },
          },
        },
      });

      return reply;
    } catch (error) {
      return error;
    }
  }

  async createReply(dto: ReplyDto) {
    try {
      const validate = createreplyschema.validate(dto);
      if (validate.error) return validate.error;

      const reply = await prisma.reply.create({
        data: { ...dto },
      });

      await this.updateReplyCount(dto.threadId);
      return reply;
    } catch (error) {
      return error;
    }
  }

  async addReply(dto: ReplyDto) {
    try {
      const validate = createreplyschema.validate(dto);
      if (validate.error) return validate.error;

      const reply = await prisma.reply.create({
        data: { ...dto },
      });
      console.log(reply);
      return reply;
    } catch (error) {
      throw new Error(error.message || "Failed to add reply");
    }
  }

  async countReplies(threadId: number) {
    try {
      const replyCount = await prisma.reply.count({
        where: { threadId },
      });
      return replyCount;
    } catch (error) {
      throw new Error(error.message || "Failed to count replies");
    }
  }

  async deleteReply(id: number) {
    try {
      const reply = await prisma.reply.delete({
        where: { id: Number(id) },
      });
      await this.updateReplyCount(reply.threadId);
      return reply;
    } catch (error) {
      return error;
    }
  }

  private async updateReplyCount(threadId: number) {
    try {
      const count = await prisma.reply.count({
        where: { threadId },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: { numberOfReplies: count },
      });
    } catch (error) {
      return error;
    }
  }
}

export const replyService = new ReplyService();
