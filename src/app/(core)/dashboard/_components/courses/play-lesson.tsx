"use client";

import React, { useEffect, useState } from "react";
import { useCourses } from "../../course/course-context";
import { useSearchParams } from "next/navigation";
import { Heading } from "@/components/ui/heading";

export const PlayLesson = () => {
  const searchParams = useSearchParams();
  const currentLessonId = Number(searchParams.get("lesson"));
  const { lessons } = useCourses();

  const [selectedLesson, setSelectedLesson] = useState(
    () => lessons.find(({ id }) => id === Number(currentLessonId)) || lessons[0]
  );

  useEffect(() => {
    const newLesson =
      lessons.find(({ id }) => id === currentLessonId) || lessons[0];
    setSelectedLesson(newLesson);
  }, [currentLessonId, lessons]);

  if (!selectedLesson) return <p>No hay lecciones disponibles.</p>;

  return (
    <div>
      <Heading title={selectedLesson.title} description="......." />
      <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
        <video
          controls
        
          className="h-full w-full object-cover"
          key={selectedLesson.id}
        >
          <source src={selectedLesson.video_url} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    </div>
  );
};
