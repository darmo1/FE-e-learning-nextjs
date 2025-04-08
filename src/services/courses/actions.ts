"use server";

import { CreateCourseProps } from "./schemas";
import { ENDPOINT } from "@/constants/endpoints";
import { AuthorizationHeaders } from "../../../utils/headers";
import { requestHandler } from "../../../utils/request-handler";
import { apiEndpoints } from "@/constants/endpoints.api";

type responseType = {
  success: boolean;
  error?: unknown;
  data?: unknown;
  message: string;
};

export const createCourseAction = async (
  formData: CreateCourseProps
): Promise<responseType> => {
  const { image } = formData;
  const _formData = new FormData();
  _formData.append("image", image);
  try {
    const res = await fetch(apiEndpoints.UPLOAD_IMAGE, {
      method: "POST",
      body: _formData,
    });

    if (!res.ok) {
      throw new Error("Error uploading image");
    }

    const responseImage = await res.json();
    const imageUrl = responseImage?.secure_url || ""

    return await createCourse(formData, imageUrl);
  } catch (err) {
    return {
      success: false,
      message: "Error uploading image",
      error: err,
    };
  }
};

export const createCourse = async (data: CreateCourseProps, imageUrl: string) => {
  try {
    const headers = await AuthorizationHeaders() || {};
    const url = ENDPOINT.CREATE_COURSE;
    requestHandler({
      url,
      method: "POST",
      body: {
        ...data,
        image_url: imageUrl,
      },
      headers,
    });

    return {
      success: true,
      message: "You form have been successfull",
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      success: false,
      error,
      message: "Error creating course",
    };
  }
};

export const getCoursesByUser = async () => {
  const headers = await AuthorizationHeaders() || {};
  const response = await fetch(ENDPOINT.GET_COURSES_BY_USER, {
    headers,
  });

  const courses = await response.json();
  return courses;
};

export const getDemoCourse = async (courseId: string) => {
  const headers = await AuthorizationHeaders() || {};

  const response = await fetch(`${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}/demo`, {
    headers,
  });

  const course = await response.json();

  return course;
}
