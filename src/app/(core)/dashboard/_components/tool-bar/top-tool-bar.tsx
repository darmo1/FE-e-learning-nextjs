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

export const TopToolBar = () => {
  const { lessons } = useCourses();

  return (
    <Conditional
      test={!!lessons.length}
      fallback={<div>No existe clases aún</div>}
    >
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex justify-end">
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
