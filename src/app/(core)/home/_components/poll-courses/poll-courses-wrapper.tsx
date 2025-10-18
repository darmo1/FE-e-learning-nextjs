import { getCoursesByUser } from "@/services/courses/actions";
import React, { Suspense } from "react";
import { PollCourses } from "./poll-courses";
import { CoursesProps } from "./types";
import { stringHyphenated } from "../../../../../../utils/string";
import { Conditional } from "@/components/common/conditional";

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
      <Conditional test={coursesWithHref.length > 0} 
        fallback={<div>Proximamente</div>}
          >
        <PollCourses courses={coursesWithHref} />
      </Conditional>
    </Suspense>
  );
};  
