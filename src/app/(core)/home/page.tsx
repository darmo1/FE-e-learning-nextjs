import { Heading } from "@/components/ui/heading";
import { CoursesCarousel } from "./_components/my-courses/courses-carousel";
import { PollCoursesWrapper } from "./_components/poll-courses/poll-courses-wrapper";
import { getCookie } from "../../../../utils/cookies";
import { redirect } from "next/navigation";
import { getCoursesEnrolled } from "@/services/enrollments/action";
import { Container } from "@/components/common/containter";

export default async function Home() {
  const token = await getCookie("access_token");
  const isLogged = !!token;

  if (!isLogged) {
    return redirect("/");
  }

  const { data: courses } = await getCoursesEnrolled();

  return (
    <>
    <Container className="py-16">
      <Heading
        title="Bienvenido a la app"
        description="Esta es la pagina de inicio"
      />
      <div>
        <CoursesCarousel
          title="My Courses"
          description="Expand your skills with our comprehensive selection of courses"
          courses={courses}
        />
        {/**Add another course */}
        <Heading
          title="Otros cursos que te pueden interesar"
          description="Otros cursos"
        />

        <PollCoursesWrapper />
      </div>
      </Container>
    </>
  );
}
