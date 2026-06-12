"use server";

import { unstable_rethrow } from "next/navigation";
import { CreateCourseProps } from "./schemas";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { replaceTokenUrl } from "../../../utils/string";
import { CoursesProps } from "@/app/(core)/dashboard/course/types";
import { DemoCourseContent } from "./types";
import { uploadImage } from "../uploads/upload-image";
import { ActionResult, actionFailure, actionSuccess } from "../types";

export const createCourseAction = async (
  formData: CreateCourseProps
): Promise<ActionResult<CoursesProps>> => {
  try {
    const imageUrl = formData.image ? await uploadImage(formData.image) : "";

    const { data: course } = await requestHandler<CoursesProps>({
      url: ENDPOINT.CREATE_COURSE,
      method: "POST",
      body: {
        ...formData,
        image_url: imageUrl,
      },
    });

    return actionSuccess(course, "Curso creado exitosamente");
  } catch (error) {
    // Los redirects de Next (p. ej. 401 -> /auth/refresh) viajan como
    // excepciones: hay que relanzarlos o el refresh de sesión nunca ocurre.
    unstable_rethrow(error);
    console.error("Error creating course:", error);
    return actionFailure("Error creating course", error);
  }
};

export const editCourseAction = async (
  formData: Partial<CreateCourseProps>,
  courseId: string
): Promise<ActionResult<CoursesProps | undefined>> => {
  try {
    const { image, ...data } = formData;
    const imageUrl = image instanceof File ? await uploadImage(image) : undefined;

    const { data: course } = await requestHandler<CoursesProps | undefined>({
      url: replaceTokenUrl(ENDPOINT.EDIT_COURSE, courseId),
      method: "PATCH",
      body: {
        ...data,
        ...(imageUrl && { image_url: imageUrl }),
      },
    });

    return actionSuccess(course, "Curso actualizado exitosamente");
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error editing course:", error);
    return actionFailure("Error editing course", error);
  }
};

export const getCoursesByUser = async () => {
  const { data: courses } = await requestHandler<CoursesProps[]>({
    url: ENDPOINT.GET_COURSES_BY_USER,
  });
  return courses;
};

export const getDemoCourse = async (courseId: string) => {
  const { data: course } = await requestHandler<DemoCourseContent>({
    url: `${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}/demo`,
  });
  return course;
};

export const getCoursesByInstructor = async () => {
  return requestHandler<CoursesProps[]>({
    url: ENDPOINT.GET_COURSES_BY_INSTRUCTOR,
  });
};

export const getAllCourses = async () => {
  const { data: courses } = await requestHandler<CoursesProps[]>({
    url: ENDPOINT.GET_ALL_COURSES,
  });
  return courses;
};
