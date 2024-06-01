import joi from "joi";
import { CreateThreadDto } from "../dto/threads-dto";

export const createthreadschema = joi.object<CreateThreadDto>({
  image: joi.string(),
  content: joi.string().min(1).required(),
  createdBy: joi.number().optional(),
});
