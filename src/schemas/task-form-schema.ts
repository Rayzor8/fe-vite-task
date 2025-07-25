import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, "Judul task wajib diisi")
    .min(3, "Judul task minimal 3 karakter")
    .max(100, "Judul task maksimal 100 karakter")
    .trim(),
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
});
