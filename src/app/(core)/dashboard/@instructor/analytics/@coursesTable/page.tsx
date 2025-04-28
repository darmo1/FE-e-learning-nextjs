import { Heading } from "@/components/ui/heading";
import { CoursesTable } from "./components/courses-table";
import { getAnalyticsCoursesByInstructor } from "@/services/analytics/action";

export default async function Page() {
  const courseTable = (await getAnalyticsCoursesByInstructor()) || {};

  return (
    <main className="my-4">
      <Heading
        title="Tabla de cursos"
        description="Aqui puedes visualizar la analitica de tus cursos creados"
   
      />
      <CoursesTable coursesTable={courseTable} />
    </main>
  );
}
