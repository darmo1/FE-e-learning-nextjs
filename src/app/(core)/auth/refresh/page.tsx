// app/auth/refresh/page.tsx
"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiEndpoints } from "@/constants/endpoints.api";

export default function RefreshPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";


  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await fetch(apiEndpoints.COOKIE, {
          method: "POST",
          credentials: "include", // 🔥 clave para que el navegador envíe las cookies
          body: JSON.stringify(""), // Puedes evitar enviar el body si usas cookies en FastAPI directamente
        });

        if (res.ok) {
          router.replace(redirectTo); // Volver a donde estaba el usuario
        } else {
          router.replace("/auth"); // Si falla el refresh
        }
      } catch (err) {
        console.log(err);
        router.replace("/auth");
      }
    };

    refreshToken();
  }, [router, redirectTo]);

  return <p>Estamos renovando tu sesión... ⏳</p>;
}
