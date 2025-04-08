export type LessonProps = {
  title: string;
  is_free: boolean;
  id?: number;
  course_id: number | string;
  video_url?: string;
  description?: string
};
