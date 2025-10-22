'use client'

import { v4 as uuid } from "uuid";
import { demoCourseProps } from "../../[coursename]/[courseId]/page";
import { Video as VideoIcon } from "lucide-react";
import {
  CardVideoCourse,
  CourseCardVideoProps,
} from "@/components/common/card-video";
import { fromHyphenatedToString } from "../../../../../../utils/string";
import { useUser } from "@/app/user-context";

export const ContentCourse = ({
  contentCourse,
  coursename,
}: {
  contentCourse: demoCourseProps;
  coursename: string;
}) => {
  const { role } = useUser();
  const { content, demo } = contentCourse;

  const courseData =
    demo.length > 0
      ? demo.map((course) => ({
          ...course,
          courseId: course?.course_id,
          href: `/dashboard/course/${course?.course_id}`,
          video_url: course?.video_url || null,
        }))[0]
      : ({} as CourseCardVideoProps);

  return (
    <>
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold">
          {fromHyphenatedToString(coursename)}
        </h1>
        <p className="text-gray-600">Descripción del curso</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold ">Contenido del curso</h2>
          <ul className="list-disc list-inside mt-2 me-4">
            {content.map(({ title, description }) => (
              <li key={uuid()} className="my-3 flex flex-col border-b-1 ">
                <div className="flex">
                  <VideoIcon className="me-2 w-4 h-4" />
                  {title}
                </div>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-start-4  md:col-span-1">
        {/* <Conditional test={!isEmpty(courseData)}> */}
          <CardVideoCourse {...courseData} role={role} />
        {/* </Conditional> */}
      </div>
      <div></div>
    </>
  );
};
