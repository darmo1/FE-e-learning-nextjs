"use client";

import { v4 as uuid } from "uuid";
import { CoursesProps } from "./types";
import { VerticalCard } from "@/components/common/vertical-card";

export const PollCourses = (
  { courses }: { courses: CoursesProps[] } = { courses: [] }
) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <VerticalCard key={uuid()} {...course} href={course.href || "#"} />
      ))}
    </div>
  );
};
