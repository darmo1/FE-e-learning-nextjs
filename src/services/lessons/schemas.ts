import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  "upload-video": z
    .instanceof(File, { message: "Debes subir un archivo" })
    .refine((file) => file.size > 0, { message: "El archivo no puede estar vacío" })
    .refine((file) => file.type.startsWith("video/"), { message: "El archivo debe ser un video" }),
});

export type CreateLessonSchema = z.infer<typeof createLessonSchema>;