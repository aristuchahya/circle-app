import joi from "joi";
export type LikeDto = {
  userId: number;
  threadId: number;
};

export const createlikeschema = joi.object<LikeDto>({
  userId: joi.number().required(),
  threadId: joi.number().required(),
});
