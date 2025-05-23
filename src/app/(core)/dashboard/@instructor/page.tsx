import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";
import { Heading } from "@/components/ui/heading";
import { getCoursesByInstructor } from "@/services/courses/actions";
import { PollInstructorCoursesWrapper } from "../_components/poll-rol-courses-wrapper";
import { Suspense } from "react";
import HighlightedHeading from "@/components/common/highlighted-heading";

export default async function DashboardPageInstructor() {
  const { data: courses } = await getCoursesByInstructor();
  const showCourses = Boolean((courses || []).length);

  return (
    <div>
      <HighlightedHeading
        highlight="Mis cursos"
        highlightClassName="before:bg-amber-500/30"
        className="text-md"
      />
      <Heading
        title="Hola, Bienvenido al dashboard de instructores"
        description="Aqui puedes visualizar tus cursos creados"
      />

      <hr className="border-gray-200 my-4" />
      <Conditional
        test={showCourses}
        fallback={
          <EmptyCoursesCard
            title="No tienes cursos creados"
            description="Empieza creando un curso👨‍💻"
          />
        }
      >
        <Suspense fallback={<div>Cargando...</div>}>
          <PollInstructorCoursesWrapper courses={courses} />
        </Suspense>
      </Conditional>
    </div>
  );
}
