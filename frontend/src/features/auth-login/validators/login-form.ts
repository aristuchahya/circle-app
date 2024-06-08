import { z } from "zod";

export const loginSchema = z.object({
  usernameOrEmail: z.union([
    z
      .string({ message: "Email is required" })

      .email({ message: "Invalid email" })

      .trim(),
    z.string({ message: "Username is required" }).min(3).max(15).trim(),
  ]),
  password: z.string(),
});
