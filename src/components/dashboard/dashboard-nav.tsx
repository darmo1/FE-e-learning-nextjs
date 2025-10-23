"use client";

import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/app/user-context";
import { LayoutDashboardIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { ChartNoAxesColumn } from "lucide-react";
import { ProfileBadge } from "./profile-badge";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItems = {
  title: string;
  href: string;
  icon?: React.ElementType;
}[];

export function DashboardNav() {
  const { role } = useUser();
  const pathName = usePathname();
  const navItems: NavItems = [
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
            title: "Analitica",
            href: "/dashboard/analytics",
            icon: ChartNoAxesColumn,
          },
        ]
      : []),
  ];
  return (
    <div className="flex flex-col shadow-xl bg-muted/40 min-w-36">
      <ProfileBadge role={role} />
      <nav>
        <ul>
          {navItems.map(({ title, href, icon: Icon }) => (
            <li key={uuidv4()}>
              <Link
                href={href}
                className={`flex px-4 items-center gap-2 p-2  hover:bg-primary/20 transition-colors ${
                  pathName === href ? "bg-primary/20 font-semibold" : ""
                } rounded-md m-2`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
