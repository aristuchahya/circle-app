import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string({ message: "Fullname is required" }).min(3).max(100),
  username: z.string({ message: "Username is required" }).min(3).max(15).trim(),
  email: z
    .string({ message: "Email is required" })

    .email({ message: "Invalid email" })
    .trim(),
  password: z
    .string({ message: "Password must be at least 6 characters long" })
    .min(6)
    .trim(),
});

export const updateSchema = registerSchema.extend({
  fullName: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters long" })
    .max(100)
    .optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(15)
    .trim()
    .optional(),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters long" })
    .max(100)
    .optional(),
  photoProfile: z
    .string({ message: "invalid format of url" })
    .url({ message: "Invalid url" })
    .optional(),
});
