import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";
import { Heading } from "@/components/ui/heading";
import { getCoursesByInstructor } from "@/services/courses/actions";
import { PollInstructorCoursesWrapper } from "../_components/poll-rol-courses-wrapper";

export default async function DashboardPageInstructor() {
  const { data: courses } = await getCoursesByInstructor();
  const showCourses = Boolean((courses || []).length);

  return (
    <div>
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
        <PollInstructorCoursesWrapper courses={courses} />
      </Conditional>
    </div>
  );
}
