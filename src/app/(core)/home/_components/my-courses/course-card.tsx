import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/common/course-card";
import { BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { EnrollmentsCourses } from "./types";

export function EnrolledCourseCard({
  course,
  course_id: courseId,
  enrollment_created_at,
  orientation = "vertical",
}: EnrollmentsCourses & { orientation?: "vertical" | "horizontal" }) {
  const { category, description, image_url, title, isFeatured, lessons, students } =
    course;

  return (
    <CourseCard
      orientation={orientation}
      className={orientation === "horizontal" ? "w-[440px]" : undefined}
    >
      <CourseCard.Image src={image_url} alt={title}>
        {isFeatured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </CourseCard.Image>

      <CourseCard.Content>
        <Badge variant="outline" className="w-fit text-xs font-medium">
          {category}
        </Badge>
        <CourseCard.Title>{title}</CourseCard.Title>
        <CourseCard.Description>{description}</CourseCard.Description>

        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>
              {enrollment_created_at
                ? new Date(enrollment_created_at).toLocaleDateString()
                : ""}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            <span>{students}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-1 h-3 w-3" />
            <span>{lessons}</span>
          </div>
        </div>

        <CourseCard.Footer>
          <Button size="sm" className="w-full" asChild>
            <Link href={`/dashboard/course/${courseId}`}>Ver curso</Link>
          </Button>
        </CourseCard.Footer>
      </CourseCard.Content>
    </CourseCard>
  );
}
