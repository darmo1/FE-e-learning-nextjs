import { getDemoCourse } from "@/services/courses/actions";
import { ContentCourse } from "../../_components/content-course/content-course";
import { Suspense } from "react";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";
import { Conditional } from "@/components/common/conditional";
import Link from "next/link";

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

  console.log({ contentCourse, courseId, coursename, __: contentCourse.content[0]  }, '##content-course')

  return (
    <div className="grid md:grid-cols-4 py-16">
      <Suspense fallback={<div>Cargando...</div>}>
        <Conditional
          test={
            contentCourse.content.length !== 0 ||
            contentCourse.demo.length !== 0
          }
          fallback={
            <div>Este curso está en construcción, pronto estará disponible <Link href={"/home"} className="underline text-blue-700"> Volver a home</Link></div>
          }
        >
          <ContentCourse
            contentCourse={contentCourse}
            coursename={coursename}
          />
        </Conditional>
      </Suspense>
    </div>
  );
}
