export type InstructorCourseAnalyticsRow = {
  course_id: string | number;
  course_title: string;
  category: string;
  number_of_students: number;
};

export type InstructorAnalyticsSummary = {
  total_courses: number;
  total_students: number;
};
