export const dynamic = "force-dynamic";

import { Heading } from "@/components/ui/heading";
import { CoursesCarousel } from "./_components/my-courses/courses-carousel";
import { PollCoursesWrapper } from "./_components/poll-courses/poll-courses-wrapper";
import { getCookie } from "../../../../utils/cookies";
import { redirect } from "next/navigation";
import { getCoursesEnrolled } from "@/services/enrollments/action";
import { Container } from "@/components/common/containter";
import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";

export default async function Home() {
  const token = await getCookie("access_token");
  const isLogged = !!token;

  if (!isLogged) return redirect("/");

  const { data: courses } = await getCoursesEnrolled();
  const showCarouselCourses = Boolean((courses || []).length);

  return (
    <>
      <Container className="py-2">
        <Heading title="Bienvenido a la app" description="" className="py-4" />
        <div>
          <Conditional
            test={showCarouselCourses}
            fallback={
              <EmptyCoursesCard
                title="No tienes cursos"
                description="Puedes explorar la sección de cursos disponibles. Empieza ahora 👨‍💻"
              />
            }
          >
            <CoursesCarousel
              title="My Courses"
              description="Expand your skills with our comprehensive selection of courses"
              courses={courses}
            />
          </Conditional>

          <hr className="border border-gray-200 my-8" />
          <Heading
            title="Cursos que te pueden interesar"
            description="Otros cursos"
          />

          <PollCoursesWrapper />
        </div>
      </Container>
    </>
  );
}
