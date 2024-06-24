import { UserEntity } from "./user-entity";

export type ThreadEntity = {
  id: number;
  content: string;
  image: string;
  numberOfReplies: number;
  likesCount: number;
  isLikedUser: boolean;
  created: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
