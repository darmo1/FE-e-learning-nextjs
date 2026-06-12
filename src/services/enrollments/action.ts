"use server";

import { ENDPOINT } from "@/constants/endpoints";
import { unstable_rethrow } from "next/navigation";
import { requestHandler } from "../../../utils/request-handler";
import { ActionResult, actionFailure, actionSuccess } from "../types";
import { EnrollmentsCourses } from "@/app/(core)/home/_components/my-courses/types";

export const EnrollCourseAction = async (
  courseId: number
): Promise<ActionResult<null>> => {
  try {
    await requestHandler({
      url: ENDPOINT.ENROLL_COURSE,
      method: "POST",
      body: { course_id: courseId },
    });

    return actionSuccess(null, "You have been enrolled in the course");
  } catch (error) {
    console.error("Error enrolling in the course:", error);
    unstable_rethrow(error);
    return actionFailure("Error enrolling in the course", error);
  }
};

export const getCoursesEnrolled = async (): Promise<
  ActionResult<EnrollmentsCourses[]>
> => {
  try {
    const { data } = await requestHandler<EnrollmentsCourses[]>({
      url: ENDPOINT.COURSES_ENROLLED,
    });

    return actionSuccess(data ?? [], "Get courses enrolled successfully");
  } catch (error) {
    console.error("Error getting courses enrolled:", error);
    unstable_rethrow(error);
    return actionFailure("Error getting courses enrolled", error);
  }
};
