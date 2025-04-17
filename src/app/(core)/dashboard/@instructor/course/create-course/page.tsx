export const dynamic = "force-dynamic";

import { Heading } from "@/components/ui/heading";
import { CourseContextProvider } from "./create-course.context";
import {
  CreateCourseForm,
  CreateCourseFormWrapper,
} from "../../../_components/create-course-form";
import { NavigationStepsForm } from "../../../_components/navigation-steps-form";
import {
  CreateLessonForm,
  CreateLessonFormWrapper,
} from "../../../_components/create-lesson-form";
import { replaceTokenUrl } from "../../../../../../../utils/string";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../../../../../utils/request-handler";
import { Course } from "@/app/(core)/home/_components/my-courses/types";

import { CreateCourseFormWrapperProps } from "../../../_components/create-course-form/types";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ courseId: string }>;
}) {
  const { courseId } = await searchParams;

  let courseDataForm = {} as CreateCourseFormWrapperProps;
  if (courseId) {
    const url = replaceTokenUrl(ENDPOINT.GET_COURSE_BY_COURSE_ID, courseId);
    const { data }: { data: Course } = await requestHandler({
      url,
    });

    courseDataForm = {
      ...data,
      //  image_url: data.image_url ? await urlToFile(data.image_url) : undefined,
    };
  }

  return (
    <CourseContextProvider>
      <Heading title="Cursos " description="Your personal dashboard" />
      <NavigationStepsForm />
      <CreateCourseFormWrapper course={courseDataForm}>
        <CreateCourseForm />
      </CreateCourseFormWrapper>
      <CreateLessonFormWrapper isCreatePage>
        <CreateLessonForm />
      </CreateLessonFormWrapper>
    </CourseContextProvider>
  );
}

export default Page;
