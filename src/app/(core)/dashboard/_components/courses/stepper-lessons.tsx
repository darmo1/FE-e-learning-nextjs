import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { LessonsProps } from "../../course/[id]/page";
import { v4 as uuid } from "uuid";
import { Conditional } from "@/components/common/conditional";
import Link from "next/link";

export const StepperLessons = ({
  lessons = [],
}: {
  lessons: LessonsProps[];
}) => {
  return (
    <div className="w-full space-y-0 relative">
      {/* {/* Vertical line connecting steps */}
      <div className="absolute left-3 top-8 bottom-8 w-0.5 bg-muted" />

      {lessons.map(({ course_id, id:lessonId, is_free, title, video_url }) => (
        <div
          key={uuid()}
          className="relative flex items-center py-3 cursor-pointer"
          onClick={() => {}}
        >
          <div
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full border-2 z-10",
              false
                ? "bg-primary text-primary-foreground border-primary"
                : false
                ? "bg-primary/20 border-primary/50"
                : "bg-background border-muted"
            )}
          >
            <Conditional
              test={false}
              fallback={<span className="text-lg font-medium">{lessonId} </span>}
            >
              <Check className="h-6 w-6" />
            </Conditional>
          </div>
          <Link href={`/dashboard/course/${course_id}?lesson=${lessonId}`}>
          <div
            className={cn(
              "ml-4 font-medium",
              10 === 1 ? "text-foreground" : "text-muted-foreground  bg-blue-100"
            )}
          >
            {title}
          </div>
          
          </Link>
         
        </div>
      ))}
    </div>
  );
};
