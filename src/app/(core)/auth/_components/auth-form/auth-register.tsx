"use client";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

export const AuthRegister = () => {
  const { register } = useFormContext();
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-4">
        <InputField
          label="Nombre completo"
          {...register("fullName")}
          placeholder="John Doe"
          minLength={3}
          required
        />
        <InputField
          type="email"
          label="Email"
          {...register("email")}
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          required
        />

        <div className="space-y-1.5">
          <InputField
            type="password"
            label="Contraseña"
            {...register("password")}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="text-xs text-gray-400">
            Debe tener al menos 8 caracteres
          </p>
        </div>
      </div>

      <Button className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          <>
            Crear cuenta
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
