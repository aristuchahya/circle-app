export type CreateThreadDto = {
  createdBy: number;
  content: string;
  image: string;
};

export type UpdateThreadDto = CreateThreadDto;
