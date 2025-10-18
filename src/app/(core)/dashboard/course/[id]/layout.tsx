import { getCoursesByUser } from "@/services/courses/actions";
import { TopToolBar } from "../../_components/tool-bar";
import { CourseProvider } from "../course-context";
import { getLessonsByCourse } from "@/services/lessons/action";
import { BottomToolBar } from "../../_components/tool-bar/bottom-tool-bar";
import { LessonsProps } from "../types";




export default async function LayoutCourseId({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string; lessonId?: string }>;
}) {
  const { id: courseId } = await params;
  const courses = await getCoursesByUser();
  const lessons: LessonsProps[] = await getLessonsByCourse(courseId);

  return (
    <CourseProvider courses={courses} lessons={lessons}>
      <div className="w-full px-8">
      <TopToolBar />
      <div className="my-2">
         {children}
      </div>   
      <BottomToolBar />
      </div>
    </CourseProvider>
  );
}
