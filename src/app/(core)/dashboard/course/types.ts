export type CoursesProps = {
  id?: string | number;
  price: number;
  title: string;
  description: string;
  category: string;
};
export type CourseProviderProps = {
  courses: CoursesProps[];
  lessons: LessonsProps[]
};

export type LessonsProps = {
  title: string
  is_free: boolean
  id?: number,
  course_id: number,
  video_url?: string,
  description?: string
  created_at: Date
  updated_at: Date
}

export type CourseContextProps = {
  courses: CoursesProps[];
  lessons: LessonsProps[]
};


