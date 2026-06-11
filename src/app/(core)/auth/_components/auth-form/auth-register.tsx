"use client";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

export const AuthRegister = () => {
  const { register } = useFormContext();
  const { pending } = useFormStatus();
  return (
    <>
      <CardContent className="space-y-4">
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
          placeholder="name@example.com"
          required
        />

        <InputField
          type="password"
          label="Contraseña"
          {...register("password")}
          placeholder="Mínimo 8 caracteres"
          minLength={8}
          required
        />
        <p className="text-xs text-muted-foreground">
          La contraseña debe tener al menos 8 caracteres
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </>
  );
};
