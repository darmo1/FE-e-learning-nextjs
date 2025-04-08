"use client";

import { usePathname } from "next/navigation";

export function BodyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  // Definir colores según la ruta
  const backgroundColor = [pathname].includes("/")
    ? `bg-neutral-950 before:content-[''] before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]`
    : "bg-white";

  return (
    <body className={`${className} relative flex flex-col  ${backgroundColor}`}>
      {children}
    </body>
  );
}
