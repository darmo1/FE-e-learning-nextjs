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
import { Menu } from "lucide-react";
import React from "react";
import { Conditional } from "@/components/common/conditional";
import { StepperLessons } from "../courses/stepper-lessons";

import { useCourses } from "../../course/course-context";
import { Heading } from "@/components/ui/heading";
import { useSearchParams } from "next/navigation";

export const TopToolBar = () => {
  const searchParams = useSearchParams();
  const { lessons = [] } = useCourses();
  const currentLessonId = Number(searchParams.get("lesson")) || 0;

  const currentLesson = lessons.find(({ id }) => id === Number(currentLessonId)) || lessons[0]

  return (
    <Conditional
      test={!!lessons.length}
      fallback={<div>No existe clases aún</div>}
    >
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex justify-between mb-4">
            <Heading title={currentLesson?.title} description="" />
            <Button variant="outline" >
              <div className="w-full">Ver clases</div>
              <Menu className="h-5 w-10" />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 bg-white">
          <SheetHeader className="pb-4">
            <SheetTitle>Contenido del curso</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <StepperLessons lessons={lessons} />
        </SheetContent>
      </Sheet>
    </Conditional>
  );
};
