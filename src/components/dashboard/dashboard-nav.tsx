"use client";

import { useUser } from "@/app/user-context";
import { cn } from "@/lib/utils";
import {
  Building2,
  ChartNoAxesColumn,
  LayoutDashboardIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileBadge } from "./profile-badge";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const trimSlash = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export function DashboardNav() {
  const { role } = useUser();
  const pathName = trimSlash(usePathname() ?? "");

  const navItems: NavItem[] = [
    ...(role === "student"
      ? [
          {
            title: "Mis cursos",
            href: "/dashboard/course",
            icon: LayoutDashboardIcon,
          },
        ]
      : []),
    ...(role === "instructor"
      ? [
          {
            title: "Mis cursos",
            href: "/dashboard/",
            icon: LayoutDashboardIcon,
          },
          {
            title: "Crear curso",
            href: "/dashboard/course/create-course",
            icon: PlusIcon,
          },
          {
            title: "Analítica",
            href: "/dashboard/analytics",
            icon: ChartNoAxesColumn,
          },
        ]
      : []),
    ...(role === "admin"
      ? [
          {
            title: "Empresas",
            href: "/dashboard/",
            icon: Building2,
          },
        ]
      : []),
  ];

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-gray-200 bg-white md:min-h-full md:w-56 md:border-b-0 md:border-r">
      <ProfileBadge role={role} />

      <nav className="px-3 pb-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          General
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ title, href, icon: Icon }) => {
            const isActive = pathName === trimSlash(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-gray-100 font-medium text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-gray-900" : "text-gray-400"
                    )}
                  />
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
