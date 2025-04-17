import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 100KB
const VALID_VIDEO_TYPES = ["video/mp4"];

// --- Validación compartida para archivos de video ---
const baseVideoValidation = z
  .instanceof(File, { message: "Debes subir un archivo de video" })
  .refine((file) => VALID_VIDEO_TYPES.includes(file.type), {
    message: "El archivo debe ser un video (mp4)",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `El archivo es demasiado grande. El tamaño máximo es ${MAX_FILE_SIZE / 1000}KB`,
  });

// --- Validación flexible para edición (opcional) ---
const optionalVideoValidation = z
  .any()
  .refine((file) => {
    if (!file || !(file instanceof File)) return true;
    return VALID_VIDEO_TYPES.includes(file.type);
  }, {
    message: "El archivo debe ser un video (mp4)",
  })
  .refine((file) => {
    if (!file || !(file instanceof File)) return true;
    return file.size <= MAX_FILE_SIZE;
  }, {
    message: `El archivo es demasiado grande. El tamaño máximo es ${MAX_FILE_SIZE / 1000}KB`,
  });

// --- Schemas ---
const baseLessonFields = {
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  previewMode: z.string().optional(),
};

export const createLessonSchema = z.object({
  ...baseLessonFields,
  "upload-video": baseVideoValidation,
});
export type CreateLessonSchema = z.infer<typeof createLessonSchema>;

export const editLessonSchema = z.object({
  ...baseLessonFields,
  "upload-video": optionalVideoValidation,
});
export type EditLessonSchema = z.infer<typeof editLessonSchema>;
