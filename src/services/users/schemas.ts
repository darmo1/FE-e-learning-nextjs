import { z } from "zod";

export const userRegisterSchema = z.object({
  fullName: z.string().min(3, { message: "El nombre completo es requerido" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  // El backend exige mínimo 8 caracteres
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  /** Registro corporativo: token del link de invitación de una empresa. */
  inviteToken: z.string().optional(),
});


export type AuthRegisterProps = z.infer<typeof userRegisterSchema>;
