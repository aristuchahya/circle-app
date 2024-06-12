import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/users-dto";
import { v2 as cloudinary } from "cloudinary";
import { userschema } from "../validator/user";
import { UserJWTPayloads } from "../types/auth";
import { CreateFollowDto } from "../dto/follows-dto";

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

  async createUser(dto: CreateUserDto) {
    try {
      const validate = userschema.validate(dto);
      if (validate.error) {
        return validate.error;
      }
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const upload = await cloudinary.uploader.upload(dto.photoProfile, {
        upload_preset: "circle-app",
      });

      const user = await prisma.user.create({
        data: { ...dto, photoProfile: upload.secure_url },
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

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const upload = await cloudinary.uploader.upload(dto.photoProfile, {
        upload_preset: "circle-app",
      });

      const userUpdate = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          ...user,
          photoProfile: upload.secure_url,
        },
      });

      return userUpdate;
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

  async followUser(dto: CreateFollowDto) {
    const { followerId, followingId } = dto;
    if (followerId === followingId)
      throw new Error("user cannot follow themselves");
    try {
      const follow = await prisma.following.create({
        data: { ...dto },
      });
      return follow;
    } catch (error) {
      return error;
    }
  }

  async isFollowing(followerId: number, followingId: number) {
    try {
      const follow = await prisma.following.findUnique({
        where: {
          followingId_followerId: {
            followerId,
            followingId,
          },
        },
      });

      return follow !== null;
    } catch (error) {
      throw new Error(`Failed to check follow status: ${error.message}`);
    }
  }

  async findFollow(user: UserJWTPayloads) {
    try {
      const users = await prisma.user.findMany();

      const follows = await prisma.following.findMany({
        where: {
          followerId: user.id,
        },
      });

      return users.map((u) => {
        const isFollowing = follows.some(
          (follow) => follow.followingId === u.id
        );
        return { ...u, isFollowing };
      });
    } catch (error) {
      throw new Error(error.message || "Failed to retrieve users");
    }
  }

  async find(search: string) {
    try {
      return await prisma.user.findMany({
        orderBy: [
          {
            fullName: "asc",
          },
          {
            username: "asc",
          },
        ],
        where: {
          OR: [
            {
              username: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fullName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new Error(error.message || "Failed to retrieve users");
    }
  }
}

export const userService = new UserService();
