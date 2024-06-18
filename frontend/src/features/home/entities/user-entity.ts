export type UserEntity = {
  id: number;
  fullName: string;
  username: string;
  photoProfile: string;
  bio: string;
  email: string;
  password: string;
  isFollowing: boolean;
  createdAt: Date;
  updatedAt: Date;
};
