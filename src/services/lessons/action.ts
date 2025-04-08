"use server";
import { apiEndpoints } from "@/constants/endpoints.api";
import { requestHandler } from "../../../utils/request-handler";
import { AuthorizationHeaders } from "../../../utils/headers";
import { ENDPOINT } from "@/constants/endpoints";
import { createLessonSchema } from "./schemas";

export const createLessonAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const body = Object.fromEntries(formData);
  const result = createLessonSchema.safeParse(body);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    // const file = formData.get("upload-video");
    const res = await fetch(apiEndpoints.UPLOAD_VIDEO, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const responseVideo = await res.json();
      return createDataLesson(body, responseVideo);
    }
  } catch (err) {
    return {
      success: false,
      message: "_error from upload video",
      errors: err,
    };
  }
};

const createDataLesson = async (_data, video) => {
  const headers = await AuthorizationHeaders() || {};
  try {
    const { response, data } = await requestHandler({
      url: ENDPOINT.CREATE_LESSON,
      method: "POST",
      headers,
      body: {
        title: _data.title,
        video_url: video?.secure_url || "",
        is_free: false,
        course_id: 3,
      },
    });

    return {
      success: true,
      message: "_success All process",
      errors: "",
    };
  } catch (error) {

    return {
      success: false,
      message: "_error from save lesson",
      errors: "",
    };
  }
};

export const getLessonsByCourse = async (courseId: string) => {
  const headers = await AuthorizationHeaders();
  const url = `${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}`;
  const response = await fetch(url, {
    headers,
  });

  const lessons = await response.json();

  return lessons;
};
