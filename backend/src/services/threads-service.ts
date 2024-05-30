import { PrismaClient } from "@prisma/client";
import { CreateThreadDto, UpdateThreadDto } from "../dto/threads-dto";

const prisma = new PrismaClient();

class ThreadSevice {
  async getAllThreads() {
    try {
      return await prisma.thread.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOneThread(id: number) {
    try {
      const thread = await prisma.thread.findFirst({
        where: { id },
      });
      if (!thread) return null;

      return thread;
    } catch (error) {
      return error;
    }
  }

  async createThread(dto: CreateThreadDto) {
    try {
      const thread = await prisma.thread.create({
        data: { ...dto },
      });
      return thread;
    } catch (error) {
      return error;
    }
  }

  async updateThread(id: number, dto: UpdateThreadDto) {
    try {
      const thread = await prisma.thread.findFirst({
        where: { id: Number(id) },
      });

      if (dto.content) {
        thread.content = dto.content;
      }
      if (dto.image) {
        thread.image = dto.image;
      }

      return await prisma.thread.update({
        where: { id: Number(id) },
        data: { ...thread },
      });
    } catch (error) {}
  }
}
