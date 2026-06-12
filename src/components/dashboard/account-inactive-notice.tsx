"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MailWarning, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { resendActivationAction } from "@/services/users/actions";

/**
 * Pantalla de bloqueo para cuentas con is_active = false: la cuenta existe
 * pero el email no fue verificado (o la cuenta fue desactivada), así que el
 * usuario no puede seguir usando la plataforma hasta activarla.
 */
export function AccountInactiveNotice({ email }: { email?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const handleResend = () => {
    startTransition(async () => {
      const { success, message } = await resendActivationAction();
      if (success) {
        setSent(true);
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/auth");
    router.refresh();
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
      <MailWarning className="h-10 w-10 text-amber-500" />
      <h2 className="text-lg font-semibold text-gray-900">
        Tu cuenta aún no está activada
      </h2>
      <p className="text-sm text-gray-600">
        {email ? (
          <>
            Enviamos un correo de verificación a <strong>{email}</strong>.{" "}
          </>
        ) : null}
        Para continuar usando la plataforma debes verificar tu correo. Si no
        encuentras el email, revisa la carpeta de spam o solicita uno nuevo.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={handleResend} disabled={isPending || sent}>
          {isPending ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : sent ? (
            "Correo enviado"
          ) : (
            "Reenviar correo de activación"
          )}
        </Button>
        <Button variant="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
