import React from "react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-8">{children}</div>;
}
