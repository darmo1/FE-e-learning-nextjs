"use client";

import { useUser } from "@/app/user-context";

const ROLE_DESCRIPTIONS: Record<string, string> = {
  student: "Continúa donde lo dejaste o explora cursos nuevos.",
  instructor: "Gestiona tus cursos y revisa el avance de tus estudiantes.",
  admin: "Administra empresas, cupos y reportes de la plataforma.",
};

export const HeadingUser = () => {
  const { fullName, role } = useUser();
  const firstName = (fullName ?? "").split(" ")[0] || "de nuevo";

  return (
    <header className="pb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Hola, {firstName}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {ROLE_DESCRIPTIONS[role ?? ""] ?? "Bienvenido a tu dashboard."}
      </p>
    </header>
  );
};
