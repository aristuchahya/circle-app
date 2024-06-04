import { PrismaClient } from "@prisma/client";
import { CreateFollowDto } from "../dto/follows-dto";
import { createthreadschema } from "../validator/threads";

const prisma = new PrismaClient();

class FollowService {
  async createFollow(dto: CreateFollowDto) {
    try {
      const validate = createthreadschema.validate(dto);
      if (validate.error) {
        return validate.error;
      }

      const follow = await prisma.following.create({
        data: dto,
      });
      return follow;
    } catch (error) {
      return error;
    }
  }

  async unFollow(dto: CreateFollowDto) {
    try {
      const unfollow = await prisma.following.delete({
        where: { id: dto.followingId },
      });

      return unfollow;
    } catch (error) {
      console.error(" Error while unfollowing", error);
      throw new Error("Could not unfollow");
    }
  }

  async getFollowers(userId: number) {
    try {
      const followers = await prisma.following.findMany({
        where: { followingId: userId },
        include: { follower: true },
      });
      return followers;
    } catch (error) {
      console.error("Error get followers", error);
      throw new Error("Could find follower");
    }
  }

  async getFollowing(userId: number) {
    try {
      const following = await prisma.following.findMany({
        where: { followerId: userId },
        include: { following: true },
      });
      return following;
    } catch (error) {
      console.error("Error get following", error);
      throw new Error("Could find following");
    }
  }
}
