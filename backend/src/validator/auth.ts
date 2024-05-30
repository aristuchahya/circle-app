import joi from "joi";
import { LoginDto, RegisterDto } from "../dto/auth-dto";

export const loginschema = joi
  .object<LoginDto>({
    email: joi.string().email().optional(),
    username: joi.string().optional(),
    password: joi.string().required(),
  })
  .xor("email", "username");

export const registerschema = joi.object<RegisterDto>({
  fullName: joi.string(),
  username: joi.string().required().min(3).max(20),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
