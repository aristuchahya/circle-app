import { UserEntity } from "./user-entity";

export type ThreadEntity = {
  id: number;
  content: string;
  image: string;
  numberOfReplies: number;
  numberOfLikes: number;
  created: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
