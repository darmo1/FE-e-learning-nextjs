
import { getLessonsByCourse } from "@/services/lessons/action";
import React, { Suspense } from "react";
import { LessonsProps } from "../../../course/types";
import { EditLessonsForm } from "./edit-lessons-form";
import { AddLessonBtn } from "./add-lesson-btn";

export const EditLessonsWrapper = async ({
  courseId,
}: {
  courseId: string;
}) => {
   
  const lessons: LessonsProps[] = await getLessonsByCourse(courseId) || [];
  return <Suspense fallback={<div>Cargando....</div>}>
    <>
    <AddLessonBtn />
    <EditLessonsForm lessons={lessons} />
    </>
  </Suspense>;
};
