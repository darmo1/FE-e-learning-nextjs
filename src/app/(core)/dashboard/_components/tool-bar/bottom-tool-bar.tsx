"use client";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useCourses } from "../../course/course-context";
import { useRouter, useSearchParams } from "next/navigation";

export const BottomToolBar = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const currentLessonId = Number(searchParams.get("lesson"));
  const { lessons } = useCourses();
  const currentIndex = lessons.findIndex(({ id }) => id === currentLessonId);
  const nextLesson = lessons[currentIndex + 1];
  const prevLesson = lessons[currentIndex - 1];

  const Next = () => {
    if (!nextLesson) return;
    route.push(
      `/dashboard/course/${nextLesson.course_id}?lesson=${nextLesson.id}`
    );
  };

  const Prev = () => {
    if (!prevLesson) return;
    route.push(
      `/dashboard/course/${prevLesson.course_id}?lesson=${prevLesson.id}`
    );
  };

  return (
    <div className="flex justify-end my-4">
      <Button
        variant={"outline"}
        onClick={Prev}
        disabled={currentLessonId <= 1}
      >
        <MoveLeft className="w-6 h-6" />
      </Button>

      <Button
        variant={"default"}
        className="ms-3"
        onClick={Next}
        disabled={currentLessonId >= lessons.length}
      >
        <MoveRight className="w-6 h-6" /> <span>Siguiente </span>
      </Button>
    </div>
  );
};
