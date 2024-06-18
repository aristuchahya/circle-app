import { UserEntity } from "../../home/entities/user-entity";

export type SearchUser = Pick<
  UserEntity,
  "photoProfile" | "fullName" | "username" | "bio" | "id"
> & { isFollowing: boolean };
