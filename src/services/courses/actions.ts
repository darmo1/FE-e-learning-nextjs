"use server";

import { CreateCourseProps } from "./schemas";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { apiEndpoints } from "@/constants/endpoints.api";
import { replaceTokenUrl } from "../../../utils/string";
import { CoursesProps } from "@/app/(core)/dashboard/course/types";

type responseType = {
  success: boolean;
  error?: unknown;
  data?: CoursesProps;
  message: string;
};

export const createCourseAction = async (
  formData: CreateCourseProps
): Promise<responseType> => {
  const { image } = formData;
  const _formData = new FormData();

  if (image) {
    _formData.append("image", image);
  }

  try {
    const res = await fetch(apiEndpoints.UPLOAD_IMAGE, {
      method: "POST",
      body: _formData,
    });

    if (!res.ok) {
      throw new Error("Error uploading image");
    }

    const responseImage = await res.json();
    const imageUrl = responseImage?.secure_url || "";

    return await createCourse(formData, imageUrl);
  } catch (err) {
    return {
      success: false,
      message: "Error uploading image",
      error: err,
    };
  }
};

export const createCourse = async (
  data: CreateCourseProps,
  imageUrl: string
) => {
  try {
   
    const url = ENDPOINT.CREATE_COURSE;
    const { data: course } = await requestHandler({
      url,
      method: "POST",
      body: {
        ...data,
        image_url: imageUrl,
      },
    });

    return {
      success: true,
      message: "You form have been successfull",
      data: course,
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

export const editCourseAction = async (
  formData: Partial<CreateCourseProps>,
  courseId: string
): Promise<responseType> => {
  const image = formData?.image || "";

  if (image instanceof File) {
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
      const imageUrl = responseImage?.secure_url || "";

      return await editCourse(formData, courseId, imageUrl);
    } catch (err) {
      return {
        success: false,
        message: "Error uploading image",
        error: err,
      };
    }
  } else {
    return editCourse(formData, courseId);
  }
};

export const editCourse = async (
  data: Partial<CreateCourseProps>,
  courseId: string,
  imageUrl?: string
) => {
  try {
    const url = replaceTokenUrl(ENDPOINT.EDIT_COURSE, courseId);

    requestHandler({
      url,
      method: "PATCH",
      body: {
        ...data,
        ...(imageUrl && { image_url: imageUrl }),
      },
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
  const { data: courses } = await requestHandler({
    url: ENDPOINT.GET_COURSES_BY_USER,
  });
  return courses;
};

export const getDemoCourse = async (courseId: string) => {
  const { data: course } = await requestHandler({
    url: `${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}/demo`,
  });

  return course;
};

export const getCoursesByInstructor = async () => {
  const response = await requestHandler({
    url: ENDPOINT.GET_COURSES_BY_INSTRUCTOR,
  });

  return response;
};
