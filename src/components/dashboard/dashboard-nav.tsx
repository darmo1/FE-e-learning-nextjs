"use client";

import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { Conditional } from "../common/conditional";
import { useUser } from "@/app/(core)/dashboard/user-context";
import { LayoutDashboardIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

type NavItems = {
  title: string;
  href: string;
  icon?: React.ElementType;
}[];

export function DashboardNav() {
  const { role } = useUser();

  const navItems: NavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },

    ...(role === "instructor"
      ? [
          {
            title: "Crear curso",
            href: "/dashboard/course/create-course",
            icon: PlusIcon,
          },
        ]
      : []),
  ];
  return (
    <Conditional test={role === "instructor"}>
      <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4"></div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm">
            {navItems.map(({ title, href, icon: Icon }, index) => (
              <Button
                key={uuidv4()}
                variant={index ? "ghost" : "secondary"}
                asChild
                onClick={() => {
                  window.location.href = href;
                }}
              >
                <div className="flex">
                  {Icon && <Icon className="w-4 h-4" />}

                  <span>{title}</span>
                </div>
              </Button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">Instructor</p>
              <p className="text-sm text-muted-foreground">
                instructor@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Conditional>
  );
}
