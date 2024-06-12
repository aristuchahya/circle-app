import { z } from "zod";
const MAX_FILE_SIZE = 5000000; // 5mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const updateSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters long" })
    .max(100)
    .optional(),
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters long" })
    .max(100)
    .optional(),
  bio: z.string().optional(),
  photoProfile: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
