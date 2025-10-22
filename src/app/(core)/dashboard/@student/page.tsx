import React, { Suspense } from "react";
import { getCoursesEnrolled } from "@/services/enrollments/action";
import { HeadingUser } from "../_components/heading-user";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "../../../../../utils/cookies";
import { redirect } from "next/navigation";
import { Container } from "@/components/common/containter";
import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";
import { CoursesCarousel } from "../../home/_components/my-courses/courses-carousel";
import { Heading } from "@/components/ui/heading";
import { PollCoursesWrapper } from "../../home/_components/poll-courses/poll-courses-wrapper";

export default async function StudentPage() {
  const token = await getCookie("access_token");
  const isLogged = !!token;

  if (!isLogged) return redirect("/");
  const { data: courses } = await getCoursesEnrolled();
  const showCarouselCourses = Boolean((courses || []).length);
  return (
    <Container className="py-2">
      <HeadingUser />
      <Suspense fallback={<div>Cargando...</div>}>
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

      </Suspense>
      <Separator className="my-2" />
      <Heading
        title="Cursos que te pueden interesar"
        description="Otros cursos"
      />

      <PollCoursesWrapper />
    </Container>
  );
}
