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
    ? `bg-neutral-950 before:content-[''] 
    before:absolute before:inset-0 before:-z-10 
    before:w-full before:h-full 
   `
    : "bg-white";

  return (
    <body className={`${className} relative flex flex-col min-h-screen ${backgroundColor}`}>
      {children}
    </body>
  );
}
