import { PrismaClient } from "@prisma/client";
import { createlikeschema, LikeDto } from "../dto/likes-dto";

const prisma = new PrismaClient();

class LikesService {
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
          likes: true,
        },
      });

      if (!thread) throw new Error("Thread not found");

      const likesCount = await prisma.like.count({
        where: { threadId },
      });

      const isLikedUser = thread.likes.some((like) => like.userId === userId);

      const isOtherUser = thread.likes.some((like) => like.userId !== userId);

      return { ...thread, likesCount, isLikedUser, isOtherUser };
    } catch (error) {
      return error;
    }
  }

  async findAll(userId: number) {
    try {
      const threads = await prisma.thread.findMany({
        where: { createdBy: userId },
        include: {
          likes: true,
        },
      });

      const totalLike = threads.reduce(
        (acc, thread) => acc + thread.likes.length,
        0
      );
      return { userId, totalLike };
    } catch (error) {
      return error;
    }
  }

  async createLike(dto: LikeDto) {
    try {
      const existingLikes = await prisma.like.findFirst({
        where: {
          threadId: dto.threadId,
          userId: dto.userId,
        },
      });

      if (existingLikes) {
        await prisma.like.deleteMany({
          where: {
            id: existingLikes.id,
          },
        });
      } else {
        await prisma.like.create({
          data: { ...dto },
        });
      }

      const likesCount = await prisma.like.count({
        where: { threadId: dto.threadId },
      });
      return { likesCount, existingLikes };
    } catch (error) {
      return error;
    }
  }

  async deleteLike(userId: number, threadId: number) {
    try {
      const unlike = await prisma.like.deleteMany({
        where: {
          userId,
          threadId,
        },
      });

      const likesCount = await prisma.like.count({
        where: { threadId },
      });
      return { likesCount, unlike };
    } catch (error) {
      return error;
    }
  }

  async totalLikeUsers(userId: number) {
    try {
      const totalLikes = await prisma.like.count({
        where: {
          Thread: {
            createdBy: userId,
          },
        },
      });

      return totalLikes;
    } catch (error) {
      return error;
    }
  }
}

export const likeService = new LikesService();
