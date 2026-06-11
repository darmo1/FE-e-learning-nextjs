"use client";

import { CLIENT_BACKEND_HOST } from "@/constants/endpoints";
import { useEffect } from "react";

const BACKEND_URL = CLIENT_BACKEND_HOST;

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
