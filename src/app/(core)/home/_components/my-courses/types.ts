export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor_id: number;
  image_url: string | null;
  duration?: string;
  students?: number;
  lessons?: number;
  isFeatured?: boolean;
  price?: number
}

export type EnrollmentsCourses = {
  id: number;
  user_id: number;
  course_id: number;
  enrollment_created_at: Date | null;
  enrollment_updated_at: Date | null;
  course: Course;
}

export interface CoursesCarouselProps {
  title: string;
  description?: string;
  courses: EnrollmentsCourses[];
}
