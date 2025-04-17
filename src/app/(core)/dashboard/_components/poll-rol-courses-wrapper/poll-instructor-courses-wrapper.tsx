import { Suspense } from "react";
import { PollCourses } from "@/app/(core)/home/_components/poll-courses/poll-courses";
import { CoursesProps } from "@/app/(core)/home/_components/poll-courses/types";

export const PollInstructorCoursesWrapper = ({
  courses,
}: {
  courses: CoursesProps[];
}) => {
  const coursesWithHref = courses.map((course) => {
    return {
      ...course,
      href: `dashboard/course/${course.id}/summary`
      // href: `/course/${stringHyphenated(course.title)}/${course.id}`,
    };
  });
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PollCourses courses={coursesWithHref} />
    </Suspense>
  );
};
