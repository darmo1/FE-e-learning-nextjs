"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import {
  CreateLessonForm,
  CreateLessonFormWrapper,
} from "../../../_components/create-lesson-form";

export const AddLessonBtn = () => {
  const [open, setOpen] = useState(false); // 👉 control externo del modal
  return (
    <Sheet  open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild >
        <div className="flex justify-between mb-4">
          <Button variant="outline" onClick={() => setOpen(true)}>
            <div className="w-full">Agregar clase</div>
            <Menu className="h-5 w-10" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 bg-white">
        <SheetHeader className="pb-4">
          <SheetTitle>Agregrar clase</SheetTitle>
          <SheetDescription></SheetDescription>
          <CreateLessonFormWrapper onSuccess={() => setOpen(false)}>
            <CreateLessonForm />
          </CreateLessonFormWrapper>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
