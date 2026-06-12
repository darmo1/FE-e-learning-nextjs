"use client";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CoursesCarouselProps } from "./types";
import { EnrolledCourseCard } from "./course-card";

export function CoursesCarousel({
  title,
  description,
  courses,
}: CoursesCarouselProps) {
  return (
    <section className="">
      <div className="container ">
        {(title || description) && (
          <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
            <div>
              {title && (
                <h2 className="mb-2 text-3xl font-bold tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="max-w-2xl text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {courses.map((course) => (
              <CarouselItem
                key={course.id}
                className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                
              >
                <EnrolledCourseCard {...course} orientation="horizontal" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end mt-6 gap-2">
            <CarouselPrevious className="relative static transform-none" />
            <CarouselNext className="relative static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
