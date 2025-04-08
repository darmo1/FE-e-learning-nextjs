import { getDemoCourse } from "@/services/courses/actions";
import { ContentCourse } from "../../_components/content-course/content-course";
import { LessonProps } from "@/services/lessons/types";

export type demoCourseProps = {
  demo: LessonProps[];
  content: LessonProps[];
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
      <ContentCourse contentCourse={contentCourse} coursename={coursename} />
    </div>
  );
}
