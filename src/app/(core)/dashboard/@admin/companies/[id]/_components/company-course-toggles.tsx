"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setCompanyCourseAction } from "@/services/companies/actions";
import type { CompanyCourse } from "@/services/companies/types";
import { Loader2 } from "lucide-react";

type CompanyCourseTogglesProps = {
  companyId: number;
  courses: CompanyCourse[];
};

export const CompanyCourseToggles = ({
  companyId,
  courses,
}: CompanyCourseTogglesProps) => {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<number | null>(null);

  const toggle = async (course: CompanyCourse) => {
    setPendingId(course.course_id);
    await setCompanyCourseAction(companyId, course.course_id, !course.enabled);
    setPendingId(null);
    router.refresh();
  };

  if (courses.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-gray-500">
        No hay cursos en la plataforma todavía.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {courses.map((course) => (
        <li
          key={course.course_id}
          className="flex items-center justify-between gap-3 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-900">{course.title}</span>
            {course.enabled && <Badge className="bg-green-600">Habilitado</Badge>}
          </div>
          <Button
            type="button"
            size="sm"
            variant={course.enabled ? "outline" : "default"}
            disabled={pendingId === course.course_id}
            onClick={() => toggle(course)}
          >
            {pendingId === course.course_id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : course.enabled ? (
              "Deshabilitar"
            ) : (
              "Habilitar"
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
};
