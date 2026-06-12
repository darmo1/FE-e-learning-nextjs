import React, { Suspense } from "react";
import { getCoursesEnrolled } from "@/services/enrollments/action";
import { HeadingUser } from "../_components/heading-user";
import { getCookie } from "../../../../../utils/cookies";
import { redirect } from "next/navigation";
import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";
import { CoursesCarousel } from "../../home/_components/my-courses/courses-carousel";
import { PollCoursesWrapper } from "../../home/_components/poll-courses/poll-courses-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default async function StudentPage() {
  const token = await getCookie("access_token");
  const isLogged = !!token;

  if (!isLogged) return redirect("/");
  const { data: courses } = await getCoursesEnrolled();
  const showCarouselCourses = Boolean((courses || []).length);

  return (
    <div className="flex flex-col gap-10">
      <HeadingUser />

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Mis cursos
            </h2>
            <p className="text-sm text-gray-500">
              {showCarouselCourses
                ? `${courses?.length} curso${(courses?.length ?? 0) > 1 ? "s" : ""} en progreso`
                : "Aún no estás inscrito en ningún curso"}
            </p>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-48 w-full rounded-lg" />}>
          <Conditional
            test={showCarouselCourses}
            fallback={
              <EmptyCoursesCard
                title="No tienes cursos todavía"
                description="Explora el catálogo y empieza a aprender hoy mismo."
                action={{ label: "Explorar cursos", href: "/home" }}
              />
            }
          >
            <CoursesCarousel
              title=""
              description=""
              courses={courses ?? []}
            />
          </Conditional>
        </Suspense>
      </section>

      <section className="border-t border-gray-200 pt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            Te puede interesar
          </h2>
          <p className="text-sm text-gray-500">
            Cursos seleccionados para seguir creciendo
          </p>
        </div>
        <PollCoursesWrapper />
      </section>
    </div>
  );
}
