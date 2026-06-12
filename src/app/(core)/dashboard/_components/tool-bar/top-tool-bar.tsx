"use client";

import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Sheet,
  SheetHeader,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
import React from "react";
import { Conditional } from "@/components/common/conditional";
import { StepperLessons } from "../courses/stepper-lessons";

import { useCourses } from "../../course/course-context";
import { useSearchParams } from "next/navigation";

export const TopToolBar = () => {
  const searchParams = useSearchParams();
  const { lessons = [] } = useCourses();
  const currentLessonId = Number(searchParams.get("lesson")) || 0;

  const currentLesson =
    lessons.find(({ id }) => id === Number(currentLessonId)) || lessons[0];

  return (
    <Conditional
      test={!!lessons.length}
      fallback={
        <div className="rounded-lg border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500">
          Este curso aún no tiene clases.
        </div>
      }
    >
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <p className="truncate text-sm text-gray-500">
          {currentLesson?.title}
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0">
              <List className="mr-1.5 h-4 w-4" />
              Contenido
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto bg-white px-4 sm:max-w-md">
            <SheetHeader className="pb-4">
              <SheetTitle>Contenido del curso</SheetTitle>
              <SheetDescription>
                {lessons.length} lección{lessons.length === 1 ? "" : "es"}
              </SheetDescription>
            </SheetHeader>
            <StepperLessons lessons={lessons} />
          </SheetContent>
        </Sheet>
      </div>
    </Conditional>
  );
};
