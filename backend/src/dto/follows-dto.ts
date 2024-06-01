import joi from "joi";
export type CreateFollowDto = {
  followingId: number;
  followerId: number;
};

export const createfollowschema = joi.object<CreateFollowDto>({
  followingId: joi.number().required(),
  followerId: joi.number().required(),
});
