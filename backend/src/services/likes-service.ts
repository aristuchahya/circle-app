import { PrismaClient } from "@prisma/client";
import { createlikeschema, LikeDto } from "../dto/likes-dto";

const prisma = new PrismaClient();

class LikesService {
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

  async createLike(dto: LikeDto) {
    try {
      const validate = createlikeschema.validate(dto);
      if (validate.error) return validate.error;

      const like = await prisma.like.create({
        data: { ...dto },
      });

      await this.updateLikeCount(dto.threadId);
      return like;
    } catch (error) {
      return error;
    }
  }

  async deleteLike(id: number) {
    try {
      const like = await prisma.like.delete({
        where: { id: Number(id) },
      });
      await this.updateLikeCount(like.threadId);
      return like;
    } catch (error) {
      return error;
    }
  }

  private async updateLikeCount(threadId: number) {
    try {
      const count = await prisma.like.count({
        where: { threadId },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: { numberOfLikes: count },
      });
    } catch (error) {
      return error;
    }
  }
}

export const likeService = new LikesService();
