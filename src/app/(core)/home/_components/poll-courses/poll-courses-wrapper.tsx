import { getCoursesByUser } from "@/services/courses/actions";
import React, { Suspense } from "react";
import { PollCourses } from "./poll-courses";
import { CoursesProps } from "./types";
import { stringHyphenated } from "../../../../../../utils/string";

export const PollCoursesWrapper = async () => {
  const courses: CoursesProps[] = await getCoursesByUser();

  const coursesWithHref = courses.map((course) => {
    return {
      ...course,
      href: `/course/${stringHyphenated(course.title)}/${course.id}`,
    };
  });

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PollCourses courses={coursesWithHref} />
    </Suspense>
  );
};
