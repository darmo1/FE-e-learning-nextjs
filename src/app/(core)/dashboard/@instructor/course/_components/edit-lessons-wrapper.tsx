import { getLessonsByCourse } from "@/services/lessons/action";
import React, { Suspense } from "react";
import { LessonsProps } from "../../../course/types";
import { EditLessonsForm } from "./edit-lessons-form";


export const EditLessonsWrapper = async ({
  courseId,
}: {
  courseId: string;
}) => {
  const lessons: LessonsProps[] = (await getLessonsByCourse(courseId)) || [];
  return (
    <Suspense fallback={<div>Cargando....</div>}>
      <>
        <EditLessonsForm lessons={lessons} />
      </>
    </Suspense>
  );
};
