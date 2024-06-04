import joi from "joi";

export type ReplyDto = {
  userId: number;
  threadId: number;
};

export const createreplyschema = joi.object<ReplyDto>({
  userId: joi.number().required(),
  threadId: joi.number().required(),
});
