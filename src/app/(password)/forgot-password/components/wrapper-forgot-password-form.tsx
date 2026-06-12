"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/input-field";
import { forgotPasswordAction } from "@/services/password/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, {
  FC,
  PropsWithChildren,
  startTransition,
  useActionState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const schemaEmail = z.object({
  email: z.string().email(),
});

export const WrapperForgotPasswordForm: FC<PropsWithChildren> = ({
  children,
}) => {
  const formMethods = useForm<z.infer<typeof schemaEmail>>({
    defaultValues: { email: "" },
    resolver: zodResolver(schemaEmail),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    data: "",
    error: true,
  });

  const onSubmit = async (data: z.infer<typeof schemaEmail>) => {
    startTransition(() => formAction({ email: data.email }));
  };

  if (!state.error && state.email) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        <h2 className="text-sm font-semibold text-gray-900">
          Revisa tu correo
        </h2>
        <p className="text-sm text-gray-500">
          Si <span className="font-medium text-gray-900">{state.email}</span>{" "}
          está registrado, te enviamos un enlace para restablecer tu contraseña
          (válido por 30 minutos).
        </p>
        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link href="/auth">Volver a iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col gap-5"
      >
        {children}

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="nombre@ejemplo.com"
          errorMessage={
            errors.email ? "El correo electrónico no es válido" : undefined
          }
          {...register("email")}
        />

        {state.error && state.data && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
            role="alert"
          >
            {state.data}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar enlace de recuperación"
          )}
        </Button>

        <Link
          href="/auth"
          className="mx-auto text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          Volver a iniciar sesión
        </Link>
      </form>
    </FormProvider>
  );
};
