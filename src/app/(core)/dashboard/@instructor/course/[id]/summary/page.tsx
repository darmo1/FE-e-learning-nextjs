import { ENDPOINT } from "@/constants/endpoints";
import { replaceTokenUrl } from "../../../../../../../../utils/string";
import { CardCourseInfo } from "../../_components/card-course-info";
import { requestHandler } from "../../../../../../../../utils/request-handler";
import { Course } from "@/app/(core)/home/_components/my-courses/types";
import { getLessonsByCourse } from "@/services/lessons/action";
import { Conditional } from "@/components/common/conditional";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HighlightedHeading from "@/components/common/highlighted-heading";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";
import { SortableLessons } from "../../_components/sortable-lessons";
import { DragAndDropContext } from "../../../context/drag-and-drop-context";
import { Suspense } from "react";

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
    <Suspense fallback={<div>Cargando...</div>}>
      <DragAndDropContext lessons={lessons}>
        <main className="py-8">
          <HighlightedHeading
            highlight="Resumen de curso"
            highlightClassName="before:bg-amber-500/30"
            className="text-2xl"
          />
          <div className="flex justify-end ">
            <Link href={`/dashboard/course/edit-course?courseId=${courseId}`}>
              <Button>Editar contenido de clases</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-start-1 col-span-1">
              <CardCourseInfo {...data} />
              
            </div>
            <div className="col-start-2 col-span-1">
              <Conditional test={Boolean(lessons.length)}>
                <div className="">
                  <HighlightedHeading
                    highlight="Informacion de clases"
                    subtitle="(Arrastra y suelta para reordenar las clases)"
                    classNameSubtitle="text-sm my-1"
                    highlightClassName="before:bg-purple-500/30"
                    className="text-md p-0"
                  />
                </div>
                <SortableLessons />
              </Conditional>
            </div>
          </div>

          {/* info lessons */}
        </main>
      </DragAndDropContext>
    </Suspense>
  );
}
