import joi from "joi";
import { CreateUserDto } from "../dto/users-dto";

export const userschema = joi.object<CreateUserDto>({
  fullName: joi.string(),
  bio: joi.string(),
  photoProfile: joi.string(),
});
