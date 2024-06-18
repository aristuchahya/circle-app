import { Request, Response } from "express";
import { userService } from "../services/users-service";
import { CreateFollowDto } from "../dto/follows-dto";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      return error;
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const user = await userService.getUserById(Number(userId));
      res.status(200).json(user);
    } catch (error) {
      return error;
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const create = await userService.createUser(req.body);
      res.status(201).json(create);
    } catch (error) {
      return error;
    }
  }

  async updateUser(req: Request, res: Response) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                       $ref: "#/components/schemas/UpdateUserDTO"
                    }  
                }
            }
        } 
    */
    try {
      const userId = res.locals.user.id;
      const user = await userService.getUserById(userId);
      console.log("user update:", user);

      if (!user) return res.status(404).json({ message: "User not found" });

      const body = {
        ...req.body,
        photoProfile: req.file.path,
      };

      const update = await userService.updateUser(userId, body);
      console.log("update result:", update);
      res.status(201).json(update);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (!user) return res.status(404).json({ message: "User not found" });

      const remove = await userService.deleteUser(Number(id));
      res.status(201).json({ message: "User deleted", remove });
    } catch (error) {
      return error;
    }
  }

  // async followStatus(req: Request, res: Response) {
  //   try {
  //     const user = res.locals.user;

  //     if (!user) return res.status(404).json({ message: "User not found" });

  //     const result = await userService.find(user);
  //     res.status(201).json({ message: "find follows", result });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  async follow(req: Request, res: Response) {
    const user = res.locals.user;
    const body = {
      ...req.body,
      followerId: user.id,
    };
    try {
      const result = await userService.followUser(body);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async isFollow(req: Request, res: Response) {
    const { followingId } = req.params;
    const followerId = res.locals.user.id;

    if (!followingId)
      return res.status(400).json({ message: "Followed user ID is required" });

    try {
      const status = await userService.isFollowing(
        followerId,
        Number(followingId)
      );
      res.status(200).json({ isfollowing: status });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findFollow(req: Request, res: Response) {
    const user = res.locals.user;
    try {
      const follow = await userService.findFollow(user);
      res.status(200).json(follow);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const followers = await userService.getFollowers(Number(userId));
      res.json(followers);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const following = await userService.getFollowing(Number(userId));
      res.json(following);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async unfollowUser(req: Request, res: Response) {
    try {
      const followerId = res.locals.user.id;
      const { followingId } = req.body;

      if (!followingId || !Number.isInteger(followingId)) {
        return res
          .status(400)
          .json({ message: "Invalid or missing followingId" });
      }

      if (!followerId || !Number.isInteger(followerId)) {
        return res
          .status(400)
          .json({ message: "Invalid or missing followerId" });
      }

      const result = await userService.unfollowUser(followerId, followingId);

      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      const users = await userService.find(search);
      return res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const userController = new UserController();
