import { UserEntity } from "../../home/entities/user-entity";

export type FollowingEntity = {
  id: number;
  following: UserEntity;
  follower: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
