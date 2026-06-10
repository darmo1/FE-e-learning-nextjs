import { CoursesProps } from "./types";
import { CourseCard } from "@/components/common/course-card";

export const PollCourses = (
  { courses }: { courses: CoursesProps[] } = { courses: [] }
) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} href={course.href || "#"}>
          <CourseCard.Image src={course.image_url} alt={course.title} />
          <CourseCard.Content>
            <CourseCard.Title>{course.title}</CourseCard.Title>
            <CourseCard.Description>{course.description}</CourseCard.Description>
            <CourseCard.Footer>
              <CourseCard.Category>{course.category}</CourseCard.Category>
              <CourseCard.Price price={course.price} />
            </CourseCard.Footer>
          </CourseCard.Content>
        </CourseCard>
      ))}
    </div>
  );
};
