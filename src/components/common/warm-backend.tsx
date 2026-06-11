"use client";

import { useEffect } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_HOST_BACKEND ?? "http://localhost:3005";

/**
 * Precalienta el backend y la base de datos serverless (Neon) apenas el
 * visitante carga la página: el /healthcheck hace un SELECT 1 que despierta
 * la BD si está suspendida, mientras el usuario todavía mira la landing.
 * Fire-and-forget: nunca bloquea ni rompe la UI.
 */
export const WarmBackend = () => {
  useEffect(() => {
    fetch(`${BACKEND_URL}/healthcheck`, { cache: "no-store" }).catch(() => {
      // Silencioso a propósito: si falla, la request igual llegó a despertar
      // la BD, y el pool_pre_ping del backend cubre el resto.
    });
  }, []);

  return null;
};
