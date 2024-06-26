import { PrismaClient } from "@prisma/client";
import { CreateThreadDto, UpdateThreadDto } from "../dto/threads-dto";
import { v2 as cloudinary } from "cloudinary";
import { createthreadschema } from "../validator/threads";

const prisma = new PrismaClient();

class ThreadSevice {
  async getAllThreads() {
    try {
      return await prisma.thread.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          created: {
            select: {
              id: true,
              username: true,
              fullName: true,
              photoProfile: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error.message || "Could not find all thread");
    }
  }

  async findOneThread(id: number) {
    try {
      const thread = await prisma.thread.findMany({
        orderBy: { createdAt: "desc" },
        where: { createdBy: id },
        include: {
          created: {
            select: {
              id: true,
              username: true,
              fullName: true,
              photoProfile: true,
              createdAt: true,
            },
          },
        },
      });
      if (!thread) return null;

      return thread;
    } catch (error) {
      throw new Error(error.message || "Could not find thread");
    }
  }

  async createThread(dto: CreateThreadDto, createdBy: number) {
    try {
      const validate = createthreadschema.validate(dto);
      if (validate.error) {
        return validate.error;
      }

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const upload = await cloudinary.uploader.upload(dto.image, {
        upload_preset: "circle-app",
      });

      const thread = await prisma.thread.create({
        data: { ...dto, createdBy, image: upload.secure_url },
      });

      return thread;
    } catch (error) {
      throw new Error(error.message || "Could not find thread");
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

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const upload = await cloudinary.uploader.upload(dto.image, {
        upload_preset: "circle-app",
      });

      return await prisma.thread.update({
        where: { id: thread.id },
        data: { ...thread, image: upload.secure_url },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteThread(threadId: number) {
    try {
      await prisma.thread.delete({
        where: { id: Number(threadId) },
      });
    } catch (error) {
      return error;
    }
  }
}

export const threadService = new ThreadSevice();
