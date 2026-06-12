import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
// La UI promete MP4, MOV y AVI: el schema debe aceptar los mismos formatos
const VALID_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
  "video/webm",
];
const INVALID_TYPE_MESSAGE = "El archivo debe ser un video (MP4, MOV, AVI o WebM)";
const TOO_LARGE_MESSAGE = "El archivo es demasiado grande. El tamaño máximo es 2GB";

// --- Validación compartida para archivos de video ---
const baseVideoValidation = z
  .instanceof(File, { message: "Debes subir un archivo de video" })
  .refine((file) => VALID_VIDEO_TYPES.includes(file.type), {
    message: INVALID_TYPE_MESSAGE,
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: TOO_LARGE_MESSAGE,
  });

// --- Validación flexible para edición (opcional) ---
const optionalVideoValidation = z
  .any()
  .refine((file) => {
    if (!file || !(file instanceof File)) return true;
    return VALID_VIDEO_TYPES.includes(file.type);
  }, {
    message: INVALID_TYPE_MESSAGE,
  })
  .refine((file) => {
    if (!file || !(file instanceof File)) return true;
    return file.size <= MAX_FILE_SIZE;
  }, {
    message: TOO_LARGE_MESSAGE,
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
