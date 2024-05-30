export type CreateUserDto = {
  fullName: string;
  username: string;
  bio: string;
  photoProfile: string;
  email: string;
  password: string;
};

export type UpdateUserDto = {
  fullName?: string;
  bio?: string;
  photoProfile?: string;
};
