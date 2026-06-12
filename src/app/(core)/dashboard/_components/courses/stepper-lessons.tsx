"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { LessonsProps } from "../../course/types";

export const StepperLessons = ({
  lessons = [],
}: {
  lessons: LessonsProps[];
}) => {
  const searchParams = useSearchParams();
  const currentLessonId =
    Number(searchParams.get("lesson")) || lessons[0]?.id || 0;

  return (
    <ol className="flex flex-col gap-1">
      {lessons.map(({ course_id, id: lessonId, title }, index) => {
        const isActive = lessonId === currentLessonId;
        return (
          <li key={lessonId}>
            <Link
              href={`/dashboard/course/${course_id}?lesson=${lessonId}`}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums",
                  isActive
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-500"
                )}
              >
                {index + 1}
              </span>
              <span className="truncate">{title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
