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
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver
            </button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbMenu
          .filter((item) => item.isActive)
          .map((item) => (
            <BreadcrumbItem key={item.normalizedPath} className="flex items-center gap-1.5">
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link
                  href={item.normalizedPath}
                  className="font-medium text-gray-900"
                >
                  {item.item}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
