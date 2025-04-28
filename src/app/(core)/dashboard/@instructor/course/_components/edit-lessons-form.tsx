"use client";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { LessonsProps } from "../../../course/types";
import { LessonViewCard } from "@/components/common/lesson-view-card";
import { Conditional } from "@/components/common/conditional";
import { CreateLessonForm as EditLessonForm } from "../../../_components/create-lesson-form";
import { EditLessonFormWrapper } from "../../../_components/create-lesson-form/edit-lesson-form.wrapper";
import { AddLessonBtn } from "./add-lesson-btn";
import { Card } from "@/components/ui/card";

export const EditLessonsForm = ({
  lessons = [],
}: {
  lessons: LessonsProps[];
}) => {
  const [editingLessons, setEditingLessons] = useState<number[]>([]);
  

  const handleEditClick = (id: number) => {
    setEditingLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const isEditing = (id: number) => editingLessons.includes(id);

  return (
    <TabsContent value="classes" className="space-y-4 pt-4 ">
      <Card className="border border-gray-300 px-4 gap-2">
        <div className="flex justify-end"><AddLessonBtn /></div>
        <Conditional
          test={Boolean(lessons.length)}
          fallback={<div>No tienes clases aún, agrega una</div>}
        >
          {lessons?.map((lesson) => {
            const editing = isEditing(Number(lesson.id));

            return (
              <EditLessonFormWrapper key={lesson.id} lesson={lesson}>
                <>
                  <div className="grid md:grid-cols-2 border border-gray-300 rounded-lg">
                    <div className="col-span-1">
                      <LessonViewCard {...lesson} onClick={handleEditClick} />
                    </div>
                    <Conditional test={editing}>
                      <div className="col-span-1 p-4">
                        <EditLessonForm />
                      </div>
                    </Conditional>
                  </div>
                </>
              </EditLessonFormWrapper>
            );
          })}
        </Conditional>
      </Card>
    </TabsContent>
  );
};
