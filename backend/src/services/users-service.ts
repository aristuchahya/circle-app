import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/users-dto";
import { v2 as cloudinary } from "cloudinary";
import { userschema } from "../validator/user";
import { UserJWTPayloads } from "../types/auth";
import { CreateFollowDto } from "../dto/follows-dto";
import { when } from "joi";

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

  async find(user: UserJWTPayloads) {
    try {
      const users = await prisma.user.findMany();

      const follows = await prisma.following.findMany({
        where: { followerId: user.id },
      });

      const followIds = new Set(follows.map((follow) => follow.followingId));

      return users.map((user) => {
        return {
          ...user,
          isFollowing: followIds.has(user.id),
        };
      });
    } catch (error) {
      console.error("Error retrieving users with follow status:", error);
      throw new Error("Could not retrieve users with follow status");
    }
  }

  async followUser(dto: CreateFollowDto) {
    const { followerId, followingId } = dto;
    if (followerId === followingId)
      throw new Error("user cannot follow themselves");
    try {
      // const existingFollow = await prisma.following.findUnique({
      //   where: { followingId_followerId: { followingId, followerId } },
      // });

      // if (existingFollow) {
      //   throw new Error("Already following this user");
      // }

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

  // async getAllStatus(followerId: number) {
  //   try {
  //     const users = await prisma.user.findMany({
  //       select: {
  //         id: true,
  //         fullName: true,
  //         following: {
  //           where: {
  //             followerId,
  //           },
  //           select: {
  //             followerId: true,
  //           },
  //         },
  //         follower: {
  //           where: {
  //             followingId: followerId,
  //           },
  //           select: {
  //             followingId: true,
  //           },
  //         },
  //       },
  //     });

  //     return users.map((user) => ({
  //       id: user.id,
  //       fullName: user.fullName,
  //       isFollowing: user.following.length > 0,
  //       isFollowedBy: user.follower.length > 0,
  //     }));
  //   } catch (error) {
  //     throw new Error(`Failed to retrieve users: ${error.message}`);
  //   }
  // }
}

export const userService = new UserService();
