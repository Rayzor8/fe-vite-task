import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title task required")
    .min(3, "Title task minimum 3 character")
    .max(100, "Title task maximum 100 character")
    .trim(),
  description: z
    .string()
    .max(500, "Description task maximum 500 character")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
});
