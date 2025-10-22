"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useParams, usePathname } from "next/navigation";
import { BreadcrumbInstructorMenu } from "../../../utils/breadcrumb-menu";
import { useRouter } from "next/navigation";
import { normalizeParams, resolvePath } from "../../../utils/common";

export function BreadcrumbMenu({ role }: { role: string | null }) {
  const router = useRouter();
  const pathnme = usePathname();
  const params = useParams() || {};

  const getBreadcrumbMenu = (role: string | null) => {
    switch (role) {
      case "admin":
        return [];
      case "instructor":
        const normalizedBreadcrumbMenu = BreadcrumbInstructorMenu.map(
          (item) => ({
            ...item,
            normalizedPath: resolvePath(item.path, normalizeParams(params)),
          })
        ).map((item) => {
          if (item.normalizedPath === pathnme) {
            return {
              ...item,
              isActive: true,
            };
          }

          return { ...item, isActive: false };
        });
        return normalizedBreadcrumbMenu;
      default:
        return [];
    }
  };

  const breadcrumbMenu = getBreadcrumbMenu(role);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button onClick={() => router.back()} className="flex items-center">
              <ArrowLeft className="w-3 h-3 mx-1" /> Volver
            </button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbMenu.map((item) => {
          if (item.isActive) {
            return (
              <BreadcrumbItem key={item.normalizedPath}>
                <BreadcrumbLink asChild>
                  <Link href={item.normalizedPath}>{item.item}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          }
          return;
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
