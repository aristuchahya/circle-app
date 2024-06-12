import { UserEntity } from "./user-entity";

export type ReplyEntity = {
  id: number;
  content: string;

  User: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
