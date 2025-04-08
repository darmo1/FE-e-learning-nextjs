"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CoursesCarouselProps } from "./types";
import { CourseCard } from "./course-card";

export function CoursesCarousel({
  title,
  description,
  courses,
}: CoursesCarouselProps) {
  return (
    <section className="">
      <div className="container ">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
            {description && (
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>
          {/* <div className="flex items-center mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="mr-2">
              View All
            </Button>
          </div> */}
        </div>

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
                <CourseCard {...course} />
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
