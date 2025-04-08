export const dynamic = 'force-dynamic';


import { Heading } from "@/components/ui/heading";
import { CourseContextProvider } from "./create-course.context";
import {
  CreateCourseForm,
  CreateCourseFormWrapper,
} from "../_components/create-course-form";
import { NavigationStepsForm } from "../_components/navigation-steps-form";
import {
  CreateLessonForm,
  CreateLessonFormWrapper,
} from "../_components/create-lesson-form";

export default function Page() {

  
  return (
    <CourseContextProvider>
      <Heading title="Cursos " description="Your personal dashboard" />
      <NavigationStepsForm />
      <CreateCourseFormWrapper>
        <CreateCourseForm />
      </CreateCourseFormWrapper>
      <CreateLessonFormWrapper>
        <CreateLessonForm />
      </CreateLessonFormWrapper>
    </CourseContextProvider>
  );
}
