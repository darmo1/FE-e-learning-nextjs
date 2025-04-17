import { EditCourseWrapper } from "../_components/edit-course-wrapper";
import { EditCourseForm } from "../_components/edit-course-form";

import { CourseContextProvider } from "../create-course/create-course.context";
import { EditLessonsWrapper } from "../_components/edit-lessons-wrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ courseId: string }>;
}) {
  const { courseId } = await searchParams;

  return (
    <CourseContextProvider>
      <EditCourseWrapper>
        <EditCourseForm searchParams={searchParams} />
        <EditLessonsWrapper courseId={courseId} />
      </EditCourseWrapper>
    </CourseContextProvider>
  );
}
