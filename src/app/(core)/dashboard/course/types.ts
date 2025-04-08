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
  video_url: string,
  course_id: number,
  id: number,
  title: string
  is_free: boolean
}

export type CourseContextProps = {
  courses: CoursesProps[];
  lessons: LessonsProps[]
};
