import { z } from "zod";

const MAX_FILE_SIZE = 100000; // 100KB
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const createCourseSchema = z.object({
  title: z.string().nonempty("Campo requerido"),
  description: z.string().nonempty("Campo requerido"),
  category: z.string().nonempty("Campo requerido"),
  price: z.number().nonnegative(),
  image: z
    .instanceof(File, { message: "Debe seleccionar una imagen válida" }) // ✅ Verifica que sea un File
    .refine((file) => VALID_IMAGE_TYPES.includes(file.type), {
      message: "El archivo debe ser una imagen (JPEG, PNG, JPG)",
    })
    .refine((file) => {
      return file.size <= MAX_FILE_SIZE}, {
      message: `El archivo es demasiado grande. El tamaño máximo es ${MAX_FILE_SIZE / 1000}KB`,
    }),
});

export type CreateCourseProps = z.infer<typeof createCourseSchema>;
