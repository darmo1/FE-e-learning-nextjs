import { EditCourseWrapper } from "../_components/edit-course-wrapper";
import { EditCourseForm } from "../_components/edit-course-form";

import { CourseContextProvider } from "../create-course/create-course.context";
import { EditLessonsWrapper } from "../_components/edit-lessons-wrapper";
import { Suspense } from "react";
import HighlightedHeading from "@/components/common/highlighted-heading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ courseId: string }>;
}) {
  const { courseId } = await searchParams;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
    
        <CourseContextProvider>
          <HighlightedHeading
            highlight="Edición de curso y clases"
            highlightClassName="before:bg-amber-500/30"
            className="text-md"
          />
          <EditCourseWrapper>
            <EditCourseForm searchParams={searchParams} />
            <Suspense fallback={<div>Cargando...</div>}>
              <EditLessonsWrapper courseId={courseId} />
            </Suspense>
          </EditCourseWrapper>
        </CourseContextProvider>

    </Suspense>
  );
}
