import HighlightedHeading from "@/components/common/highlighted-heading";
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
    <div>
      <div className="flex flex-col gap-4 w-full">
        <HighlightedHeading
          highlight="Analitica de cursos"
          highlightClassName="before:bg-amber-500/30"
        />
        {summary}

        <div>{coursesTable}</div>

        {children}
      </div>
    </div>
  );
}
