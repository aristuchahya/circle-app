import joi from "joi";

export type ReplyDto = {
  userId: number;
  threadId: number;
  content: string;
};

export const createreplyschema = joi.object<ReplyDto>({
  userId: joi.number().required(),
  threadId: joi.number().required(),
  content: joi.string().required(),
});
