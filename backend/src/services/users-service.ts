import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/users-dto";

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await prisma.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (dto.fullName) {
        user.fullName = dto.fullName;
      }

      if (dto.bio) {
        user.bio = dto.bio;
      }

      if (dto.photoProfile) {
        user.photoProfile = dto.photoProfile;
      }

      return await prisma.user.update({
        where: { id: Number(id) },
        data: { ...user },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: number) {
    try {
      return await prisma.user.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      return error;
    }
  }
}

export const userService = new UserService();
