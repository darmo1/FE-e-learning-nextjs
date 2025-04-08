export const dynamic = "force-dynamic";

import { Heading } from "@/components/ui/heading";
import { CourseWrapper } from "./_components/courses/course-wrapper";

export default async function Page() {
  return (
    <>
      <Heading title="Bienvenido" description="Estos son los cursos que has creado" />
      <CourseWrapper />
    </>
  );
}
