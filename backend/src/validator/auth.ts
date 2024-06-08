import joi from "joi";
import { LoginDto, RegisterDto } from "../dto/auth-dto";

export const loginschema = joi.object<LoginDto>({
  usernameOrEmail: joi.string().required(),
  password: joi.string().required(),
});

export const registerschema = joi.object<RegisterDto>({
  fullName: joi.string().min(3).max(100),
  username: joi.string().required().min(3).max(15).trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(6).trim(),
});
