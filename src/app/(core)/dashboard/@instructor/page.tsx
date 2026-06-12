import { Conditional } from "@/components/common/conditional";
import { EmptyCoursesCard } from "@/components/common/empty-courses-card";
import { getCoursesByInstructor } from "@/services/courses/actions";
import { PollInstructorCoursesWrapper } from "../_components/poll-rol-courses-wrapper";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { HeadingUser } from "../_components/heading-user";

export default async function DashboardPageInstructor() {
  const { data: courses } = await getCoursesByInstructor();
  const showCourses = Boolean((courses || []).length);

  return (
    <div className="flex flex-col gap-8">
      <HeadingUser />

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Mis cursos
            </h2>
            <p className="text-sm text-gray-500">
              {showCourses
                ? `${courses.length} curso${courses.length > 1 ? "s" : ""} publicado${courses.length > 1 ? "s" : ""}`
                : "Todavía no has publicado cursos"}
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/dashboard/course/create-course">
              <PlusIcon className="mr-1.5 h-4 w-4" />
              Nuevo curso
            </Link>
          </Button>
        </div>

        <Conditional
          test={showCourses}
          fallback={
            <EmptyCoursesCard
              title="Crea tu primer curso"
              description="Publica tu conocimiento: sube lecciones en video y empieza a enseñar."
              action={{
                label: "Crear curso",
                href: "/dashboard/course/create-course",
              }}
            />
          }
        >
          <Suspense fallback={<Skeleton className="h-48 w-full rounded-lg" />}>
            <PollInstructorCoursesWrapper courses={courses} />
          </Suspense>
        </Conditional>
      </section>
    </div>
  );
}
