export type CreateUserDto = {
  id: number;
  fullName: string;
  bio: string;
  photoProfile: string;
  email: string;
  username: string;
  password: string;
};

export type UpdateUserDto = {
  username?: string;
  email?: string;
  password?: string;
  fullName?: string;
  bio?: string;
  photoProfile?: string;
};

// export const createuserschema = joi.object<CreateUserDto>({
//   fullName: joi.string().required(),
//   bio: joi.string(),
//   photoProfile: joi.string(),
//   username: joi.string().required(),
//   email: joi.string().email().required(),
//   password: joi.string().required(),
//   thread: joi.array().items(
//     joi.object<CreateThreadDto>({
//       content: joi.string().required(),
//       image: joi.string(),
//     })
//   ),
// });
