"use client";

import React, { useEffect, useState } from "react";
import { useCourses } from "../../course/course-context";
import { useSearchParams } from "next/navigation";

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

  if (!selectedLesson) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center">
        <p className="text-sm font-medium text-gray-900">
          No hay lecciones disponibles
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Este curso todavía no tiene contenido publicado.
        </p>
      </div>
    );
  }

  const lessonIndex = lessons.findIndex(({ id }) => id === selectedLesson.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-black">
        <div className="relative aspect-video">
          <video
            controls
            className="h-full w-full object-contain"
            key={selectedLesson.id}
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={selectedLesson.video_url} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Lección {lessonIndex + 1} de {lessons.length}
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
          {selectedLesson.title}
        </h1>
        {selectedLesson.description && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
            {selectedLesson.description}
          </p>
        )}
      </div>
    </div>
  );
};
