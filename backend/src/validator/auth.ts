import joi from "joi";
import { LoginDto, RegisterDto } from "../dto/auth-dto";

export const loginschema = joi.object<LoginDto>({
  usernameOrEmail: joi.string().required(),
  password: joi.string().required(),
});

export const registerschema = joi.object<RegisterDto>({
  fullName: joi.string(),
  username: joi.string().optional().min(3).max(20),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
