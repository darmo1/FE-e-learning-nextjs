import { Heading } from "@/components/ui/heading";

import { PlayLesson } from "../../_components/courses/play-lesson";

export type LessonsProps = {
  video_url: string;
  course_id: number;
  id: number;
  title: string;
  is_free: boolean;
};

export default async function Page() {
  return (
    <div>
      <Heading title="Tus vídeos" description="Aqui esta todo el curso" />
      <PlayLesson />
    </div>
  );
}
