"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { userRegisterAction } from "@/services/users/actions";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const initialState = {
  success: false,
  error: null as unknown,
  data: null as unknown,
  message: "",
};

const fieldError = (error: unknown, field: string): string | undefined => {
  if (error && typeof error === "object") {
    const messages = (error as Record<string, string[]>)[field];
    if (Array.isArray(messages) && messages.length) return messages[0];
  }
  return undefined;
};

type InviteRegisterFormProps = {
  inviteToken: string;
};

export const InviteRegisterForm = ({ inviteToken }: InviteRegisterFormProps) => {
  const [state, formAction, isPending] = useActionState(
    userRegisterAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-400" />
        <p className="font-medium text-white">¡Cuenta creada!</p>
        <p className="text-sm text-gray-400">{state.message}</p>
        <Button asChild className="mt-2 w-full bg-blue-500 hover:bg-blue-400">
          <Link href="/auth">Iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none";

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="inviteToken" value={inviteToken} />

      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm text-gray-300">
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          placeholder="Ana Pérez"
          className={inputClass}
        />
        {fieldError(state.error, "fullName") && (
          <p className="mt-1 text-xs text-red-400">
            {fieldError(state.error, "fullName")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
          Correo corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="ana@tuempresa.com"
          className={inputClass}
        />
        {fieldError(state.error, "email") && (
          <p className="mt-1 text-xs text-red-400">
            {fieldError(state.error, "email")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-gray-300">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          className={inputClass}
        />
        {fieldError(state.error, "password") && (
          <p className="mt-1 text-xs text-red-400">
            {fieldError(state.error, "password")}
          </p>
        )}
      </div>

      {!state.success && state.message && state.message !== "error form" && (
        <p className="text-sm text-red-400" role="alert">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 font-semibold hover:bg-blue-400"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          "Registrarme"
        )}
      </Button>
    </form>
  );
};
