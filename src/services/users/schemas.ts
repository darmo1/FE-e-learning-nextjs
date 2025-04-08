import { z } from "zod";

export const userRegisterSchema = z.object({
  fullName: z.string().min(3, { message: "El nombre completo es requerido" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});


export type AuthRegisterProps = z.infer<typeof userRegisterSchema>;
