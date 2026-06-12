"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/input-field";
import { resetPasswordAction } from "@/services/password/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { FC, startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

type WrapperResetPasswordFormProps = {
  token: string;
};

export const WrapperResetPasswordForm: FC<WrapperResetPasswordFormProps> = ({
  token,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });

  const [state, formAction, isPending] = useActionState(resetPasswordAction, {
    message: "",
    success: false,
    done: false,
  });

  if (!token) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          El enlace está incompleto. Solicita uno nuevo desde la página de
          recuperación.
        </p>
        <Button asChild size="sm" className="mt-2">
          <Link href="/forgot-password">Recuperar contraseña</Link>
        </Button>
      </div>
    );
  }

  if (state.done && state.success) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        <h2 className="text-sm font-semibold text-gray-900">
          Contraseña actualizada
        </h2>
        <p className="text-sm text-gray-500">{state.message}</p>
        <Button asChild size="sm" className="mt-2">
          <Link href="/auth">Iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: FormValues) => {
    startTransition(() => formAction({ token, newPassword: data.newPassword }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-sm flex-col gap-5"
    >
      <InputField
        label="Nueva contraseña"
        id="newPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        errorMessage={errors.newPassword?.message}
        {...register("newPassword")}
      />

      <InputField
        label="Confirma la contraseña"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Repítela"
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {state.done && !state.success && (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
          role="alert"
        >
          {state.message}{" "}
          <Link href="/forgot-password" className="underline underline-offset-2">
            Solicitar un enlace nuevo
          </Link>
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          "Cambiar contraseña"
        )}
      </Button>
    </form>
  );
};
