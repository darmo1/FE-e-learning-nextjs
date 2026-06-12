"use client";

import { useFormContext } from "react-hook-form";
import { InputField } from "@/components/common/input-field";

export const AuthForm = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <InputField
        label="Email"
        type="email"
        {...register("email")}
        placeholder="nombre@ejemplo.com"
        required
        autoComplete="email"
      />

      <InputField
        label="Contraseña"
        id="password-login"
        {...register("password")}
        type="password"
        required
        autoComplete="current-password"
        placeholder="Tu contraseña"
      />
    </div>
  );
};
