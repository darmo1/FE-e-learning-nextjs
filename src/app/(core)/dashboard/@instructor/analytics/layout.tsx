import React from "react";

export default function AnalyticsLayout({
  children,
  coursesTable,
  summary,
}: {
  children: React.ReactNode;
  coursesTable: React.ReactNode;
  nav: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Analítica
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Rendimiento de tus cursos y estudiantes
        </p>
      </header>

      {summary}

      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-gray-900">
          Cursos
        </h2>
        {coursesTable}
      </section>

      {children}
    </div>
  );
}
