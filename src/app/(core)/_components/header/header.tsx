"use client";

import { Container } from "@/components/common/containter";
import { Play } from "lucide-react";
import Link from "next/link";
import { Conditional } from "@/components/common/conditional";
import { LogoutBtn } from "./logout-btn";
import { Suspense } from "react";

import { useUser } from "@/app/user-context";

export const Header = () => {
  const { role, isLogged } = useUser();

  const getRedirectLogo = (currentRole: string = "") => {
    if (["instructor", "admin", "student"].includes(currentRole))
      return "/dashboard";
    return "/";
  };

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <Container>
        <header className="flex h-14 items-center justify-between px-4">
          <Link
            href={getRedirectLogo(role)}
            className="flex items-center gap-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
              <Play className="h-3.5 w-3.5 fill-black text-black" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              GoProClass
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {!role ? (
              <>
                <Link
                  href="/#empresas"
                  className="hidden rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white sm:block"
                >
                  Empresas
                </Link>
                <Link
                  href="/auth"
                  className="rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth?register=true"
                  className="ml-1 rounded-md bg-white px-3.5 py-1.5 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
                <Suspense
                  fallback={
                    <span className="h-7 w-16 animate-pulse rounded-md bg-white/10" />
                  }
                >
                  <Conditional test={isLogged}>
                    <LogoutBtn />
                  </Conditional>
                </Suspense>
              </>
            )}
          </nav>
        </header>
      </Container>
    </div>
  );
};
