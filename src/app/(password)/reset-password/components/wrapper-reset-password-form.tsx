"use client";

import { Button } from "@/components/ui/button";
import { resetPasswordAction } from "@/services/password/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
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
      <div className="mx-auto w-full max-w-md rounded-md border border-white/20 p-6 text-center backdrop-blur-md">
        <p className="mb-4">
          El enlace está incompleto. Solicita uno nuevo desde la página de
          recuperación.
        </p>
        <Button asChild>
          <Link href="/forgot-password">Recuperar contraseña</Link>
        </Button>
      </div>
    );
  }

  if (state.done && state.success) {
    return (
      <div className="mx-auto w-full max-w-md rounded-md border border-white/20 p-6 text-center backdrop-blur-md">
        <p className="mb-4">✅ {state.message}</p>
        <Button asChild>
          <Link href="/auth">Iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: FormValues) => {
    startTransition(() =>
      formAction({ token, newPassword: data.newPassword })
    );
  };

  const inputClass =
    "bg-white/10 border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-md border border-white/20 p-4 shadow-xl backdrop-blur-md"
    >
      <label className="font-semibold" htmlFor="newPassword">
        Nueva contraseña
      </label>
      <input
        id="newPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        className={inputClass}
        {...register("newPassword")}
      />
      {errors.newPassword && (
        <p className="text-sm text-red-400" role="alert">
          {errors.newPassword.message}
        </p>
      )}

      <label className="font-semibold" htmlFor="confirmPassword">
        Confirma la contraseña
      </label>
      <input
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Repítela"
        className={inputClass}
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-400" role="alert">
          {errors.confirmPassword.message}
        </p>
      )}

      {state.done && !state.success && (
        <p className="text-sm text-red-400" role="alert">
          {state.message}{" "}
          <Link href="/forgot-password" className="underline">
            Solicitar un enlace nuevo
          </Link>
        </p>
      )}

      <Button type="submit" disabled={isPending} className="my-2">
        {isPending ? (
          <>
            Guardando
            <LoaderCircle className="ms-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Cambiar contraseña"
        )}
      </Button>
    </form>
  );
};
