import type { Course, Lesson } from "@/services/courses/types";

export type CoursesProps = Course;
export type LessonsProps = Lesson;

export type CourseProviderProps = {
  courses: CoursesProps[];
  lessons: LessonsProps[];
};

export type CourseContextProps = {
  courses: CoursesProps[];
  lessons: LessonsProps[];
};
