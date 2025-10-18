import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";
import Image from "next/image";
import { EnrollmentsCourses } from "./types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Conditional } from "@/components/common/conditional";

export function CourseCard({
  course,
  course_id: courseId,
  enrollment_created_at,
  orientation = "vertical",
}: EnrollmentsCourses & { orientation?: "vertical" | "horizontal" }) {
  const {
    category,
    description,
    image_url,
    title,
    isFeatured,
    lessons,
    students,
  } = course;

  const isVertical = orientation === "vertical";

  return (
    <Card
      className={`overflow-hidden flex ${
        isVertical ? "flex-col" : "flex-row w-[440px] gap-0"
      } h-full transition-all duration-200 hover:shadow-lg p-0`}
    >
      <div
        className={`relative aspect-video ${
          isVertical ? "w-full" : "w-1/2"
        } overflow-hidden`}
      >
        <Conditional
          test={isVertical}
          fallback={
            <Image
              src={image_url || "/images/course-placeholder.png"}
              alt={title}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          }
        >
          <Image
            src={image_url || "/images/course-placeholder.png"}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            width={300}
            height={100}
          />
        </Conditional>

        {isFeatured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      <div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="text-xs font-medium">
              {category}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
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
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link href={`/dashboard/course/${courseId}`} className="w-full">
            <Button size="sm" className="w-full">
              Ver curso
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
