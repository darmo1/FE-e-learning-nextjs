export type Course = {
  id?: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string | null;
  href?: string;
};

export type Lesson = {
  id?: number;
  title: string;
  description?: string;
  is_free: boolean;
  course_id: number;
  video_url?: string;
  created_at: Date;
  updated_at: Date;
  position: number;
};

export type DemoCourseContent = {
  demo: Lesson[];
  content: Lesson[];
};
