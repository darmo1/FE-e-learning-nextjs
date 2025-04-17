import React, { Suspense } from "react";

import { getCoursesEnrolled } from "@/services/enrollments/action";

import { Heading } from "@/components/ui/heading";

import { CoursesClient } from "../_components/courses/courses-client";

export default async function StudentPage() {
  const { data: courses } = await getCoursesEnrolled();
  return (
    <div>
      <Heading
        title="Bienvenido al dashboard de estudiante"
        description="Zona de aprendizaje"
      />
      <Suspense fallback={<div>Cargando...</div>}>
        <CoursesClient courses={courses} />
      </Suspense>
    </div>
  );
}
