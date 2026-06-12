"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play } from "lucide-react";
import {
  AuthForm,
  AuthFormWrapper,
  AuthRegister,
  AuthRegisterWrapper,
} from ".";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Auth = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  useEffect(() => {
    if (pathname.includes("/auth")) {
      logout();
    }
    async function logout() {
      await fetch("/api/logout", {
        method: "POST",
      });
    }
  }, [pathname]);

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              {register ? "Crea tu cuenta" : "Inicia sesión en GoProClass"}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {register
                ? "Empieza a aprender en minutos"
                : "Bienvenido de nuevo"}
            </p>
          </div>
        </div>

        <Tabs defaultValue={register ? "signup" : "login"} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="signup">Crear cuenta</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <AuthFormWrapper>
              <AuthForm />
            </AuthFormWrapper>
          </TabsContent>

          <TabsContent value="signup">
            <AuthRegisterWrapper>
              <AuthRegister />
            </AuthRegisterWrapper>
          </TabsContent>
        </Tabs>

        <p className="mt-8 text-center text-xs leading-relaxed text-gray-400">
          Al continuar aceptas nuestros{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-gray-600">
            Términos de servicio
          </Link>{" "}
          y la{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-gray-600">
            Política de privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
