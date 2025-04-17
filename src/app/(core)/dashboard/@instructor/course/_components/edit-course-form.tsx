"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  CreateCourseForm,
  CreateCourseFormWrapper,
} from "../../../_components/create-course-form";
import { CreateCourseFormWrapperProps } from "../../../_components/create-course-form/types";
import { replaceTokenUrl } from "../../../../../../../utils/string";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../../../../../utils/request-handler";
import { Course } from "@/app/(core)/home/_components/my-courses/types";

export const EditCourseForm = async ({
  searchParams,
}: {
  searchParams: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await searchParams;
  let courseDataForm = {} as CreateCourseFormWrapperProps;
  if (courseId) {
    const url = replaceTokenUrl(ENDPOINT.GET_COURSE_BY_COURSE_ID, courseId);
    const { data }: { data: Course } = await requestHandler({
      url,
    });

    courseDataForm = {
      ...data,
    };
  }
  return (
    <TabsContent value="details" className="space-y-4 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>
            Edit the basic information about your course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateCourseFormWrapper course={courseDataForm}>
            <CreateCourseForm />
          </CreateCourseFormWrapper>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
