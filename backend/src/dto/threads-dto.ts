export type CreateThreadDto = {
  createdBy: number;
  content: string;
  image?: string;
  numberOfReplies: number;
  numberOfLikes: number;
};

export type UpdateThreadDto = CreateThreadDto;
