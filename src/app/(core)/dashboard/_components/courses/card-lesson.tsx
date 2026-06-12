import { Conditional } from "@/components/common/conditional";
import { LessonsProps } from "../../course/types";
import { Video } from "lucide-react";

export const CardLesson = ({ lessons }: { lessons: LessonsProps[] }) => {
  return (
    <Conditional
      test={!!lessons.length}
      fallback={
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <Video className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-sm font-semibold text-gray-900">
            No existen lecciones aún
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Agrega tu primera lección en video para este curso.
          </p>
        </div>
      }
    >
      <section className="rounded-lg border border-gray-200 bg-white">
        <header className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold tracking-tight text-gray-900">
            Tus videos
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            {lessons.length} lección{lessons.length === 1 ? "" : "es"} publicada
            {lessons.length === 1 ? "" : "s"}
          </p>
        </header>

        <ul className="divide-y divide-gray-100">
          {lessons.map(({ id, title, video_url, description }, index) => (
            <li
              key={id}
              className="flex flex-col gap-4 p-5 transition-colors hover:bg-gray-50 sm:flex-row"
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md border border-gray-200 bg-black sm:w-56">
                <video controls className="h-full w-full object-contain">
                  <source src={video_url} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Lección {index + 1}
                </p>
                <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
                  {title}
                </h3>
                {description && (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Conditional>
  );
};
