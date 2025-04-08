"use server";
import { ENDPOINT } from "@/constants/endpoints";
import { AuthorizationHeaders } from "../../../utils/headers";
import { requestHandler } from "../../../utils/request-handler";

export const EnrollCourseAction = async (courseId: number) => {
  const headers = (await AuthorizationHeaders()) || {};
  const body = {
    course_id: courseId,
  };


  try {
    const { data, response } = await requestHandler({
      url: ENDPOINT.ENROLL_COURSE,
      method: "POST",
      headers,
      body,
    });
    if (!response.ok) {
      throw new Error("Error enrolling in the course");
    }

    return {
      success: true,
      message: "You have been enrolled in the course",
      error: null,
    };
  } catch (error) {
    console.error("Error enrolling in the course:", error);
    return {
      success: false,
      error,
      message: "Error enrolling in the course",
    };
  }
};

export const getCoursesEnrolled = async () => {
  const headers = (await AuthorizationHeaders()) || {};

  try {
    const { data, response } = await requestHandler({
      url: ENDPOINT.COURSES_ENROLLED,
      headers,
    });

    if (!response.ok) {
      throw new Error("Error getting courses enrolled");
    }
    return {
      success: true,
      data,
      message: "Courses enrolled successfully",
      error: null,
    };
  } catch (error) {
    console.error("Error getting courses enrolled:", error);
    return {
      success: false,
      error,
      message: "Error getting courses enrolled",
      data: [],
    };
  }
};
