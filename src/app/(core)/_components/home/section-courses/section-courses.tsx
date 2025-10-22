"use client";

import { Conditional } from "@/components/common/conditional";
import { useCoursesQuery } from "@/services/courses/use-courses-query";
import React, { useEffect, useState } from "react";
import { stringHyphenated } from "../../../../../../utils/string";
import { PollCourses } from "@/app/(core)/home/_components/poll-courses/poll-courses";
import { CoursesProps } from "@/app/(core)/home/_components/poll-courses/types";

export const SectionCourses = () => {
  const { data: courses, isPending } = useCoursesQuery();
  const [coursesState, setCoursesState] = useState(courses || []);

  const coursesWithHref = (courses: CoursesProps[]) =>
    courses.map((course) => {
      return {
        ...course,
        href: `/course/${stringHyphenated(course.title)}/${course.id}`,
      };
    });

  useEffect(() => {
    if (!isPending && courses.length > 0) {
      const coursesUpdated = coursesWithHref(courses);

      setCoursesState(coursesUpdated);
    }
  }, [courses, isPending]);

  return (
    <Conditional test={!isPending} fallback={<div>Loading courses...</div>}>
      <Conditional
        test={coursesState.length > 0}
        fallback={<div>Proximamente</div>}
      >
        <PollCourses courses={coursesState} />
      </Conditional>
    </Conditional>
  );
};
