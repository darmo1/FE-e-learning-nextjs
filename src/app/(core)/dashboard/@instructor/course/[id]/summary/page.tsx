import { ENDPOINT } from "@/constants/endpoints";
import { replaceTokenUrl } from "../../../../../../../../utils/string";
import { CardCourseInfo } from "../../_components/card-course-info";
import { requestHandler } from "../../../../../../../../utils/request-handler";
import { Course } from "@/app/(core)/home/_components/my-courses/types";
import { getLessonsByCourse } from "@/services/lessons/action";
import { CardLessonInfo } from "../../_components/card-lesson-info";
import { v4 as uuid } from "uuid";
import { Conditional } from "@/components/common/conditional";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HighlightedHeading from "@/components/common/highlighted-heading";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;

  const url = replaceTokenUrl(ENDPOINT.GET_COURSE_BY_COURSE_ID, courseId);
  const { data }: { data: Course } = await requestHandler({
    url,
  });
  const lessons: LessonsProps[] = await getLessonsByCourse(courseId);

  return (
    <main className="px-2">
      <HighlightedHeading
        highlight="Summary course"
        highlightClassName="before:bg-amber-500/30"
      />
      <div className="flex justify-end my-2">
        <Link href={`/dashboard/course/edit-course?courseId=${courseId}`}>
          <Button>Editar curso</Button>
        </Link>
      </div>
      {/* info course */}
      <CardCourseInfo {...data} />

      {/* info lessons */}
      <Conditional test={Boolean(lessons.length)}>
        <div className="my-4">
          <HighlightedHeading
            highlight="Informacion de clases"
            highlightClassName="before:bg-purple-500/30"
            className="text-md"
          />
        </div>
        {lessons.map(({ title, is_free, description = "" }) => (
          <CardLessonInfo
            key={uuid()}
            title={title}
            is_free={is_free}
            description={description}
          />
        ))}
      </Conditional>
    </main>
  );
}
