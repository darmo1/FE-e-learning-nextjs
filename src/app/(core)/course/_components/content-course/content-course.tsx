import { v4 as uuid } from "uuid";
import { demoCourseProps } from "../../[coursename]/[courseId]/page";
import { Video as VideoIcon } from "lucide-react";
import { CardVideoCourse } from "@/components/common/card-video";
import { fromHyphenatedToString } from "../../../../../../utils/string";

export const ContentCourse = ({
  contentCourse,
  coursename,
}: {
  contentCourse: demoCourseProps;
  coursename: string;
}) => {
  const { content, demo } = contentCourse;
  const courseData = demo.map((course) => ({
    ...course,
    courseId: course.course_id,
    href: `/dashboard/course/${course.course_id}`,
    video_url: course.video_url || null,
  }))[0];

  return (
    <>
      <div className="md- col-span-2">
        <h1 className="text-2xl font-bold">
          {fromHyphenatedToString(coursename)}
        </h1>
        <p className="text-gray-600">Descripción del curso</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold ">Contenido del curso</h2>
          <ul className="list-disc list-inside mt-2">
            {content.map(({ title, description }) => (
              <li key={uuid()} className="mb-2 flex items-center">
                <VideoIcon className="me-2 w-4 h-4" />
                {title}
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md- col-span-2">
        <CardVideoCourse {...courseData} />
      </div>
      <div></div>
    </>
  );
};
