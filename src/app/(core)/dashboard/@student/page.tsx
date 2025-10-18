import React, { Suspense } from "react";
import { getCoursesEnrolled } from "@/services/enrollments/action";
import { CoursesClient } from "../_components/courses/courses-client";
import { HeadingUser } from "../_components/heading-user";

export default async function StudentPage() {
  const { data: courses } = await getCoursesEnrolled();
  return (
    <div>
      <HeadingUser />
     
      <Suspense fallback={<div>Cargando...</div>}>
        <CoursesClient courses={courses} />
      </Suspense>
    </div>
  );
}
