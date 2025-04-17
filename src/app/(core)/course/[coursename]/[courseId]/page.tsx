import { getDemoCourse } from "@/services/courses/actions";
import { ContentCourse } from "../../_components/content-course/content-course";
import { Suspense } from "react";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";

export type demoCourseProps = {
  demo: LessonsProps[];
  content: LessonsProps[];
};

export default async function PresentationCoursePage({
  params,
}: {
  params: Promise<{ coursename: string; courseId: string }>;
}) {
  const { courseId, coursename } = await params;

  const contentCourse: demoCourseProps = await getDemoCourse(courseId);
  return (
    <div className="grid md:grid-cols-4 py-16">
      <Suspense fallback={<div>Cargando...</div>}>
        <ContentCourse contentCourse={contentCourse} coursename={coursename} />
      </Suspense>
    </div>
  );
}
