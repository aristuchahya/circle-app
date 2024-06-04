import { PrismaClient } from "@prisma/client";
import { createreplyschema, ReplyDto } from "../dto/reply-dto";

const prisma = new PrismaClient();
class ReplyService {
  async findBy(id: number) {
    try {
      const reply = await prisma.reply.findUnique({
        where: { id },
        include: { User: true, Thread: true },
      });
      return reply;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const reply = await prisma.reply.findMany({
        include: { User: true, Thread: true },
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
