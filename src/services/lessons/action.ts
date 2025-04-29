"use server";
import { apiEndpoints } from "@/constants/endpoints.api";
import { requestHandler } from "../../../utils/request-handler";
import { ENDPOINT } from "@/constants/endpoints";
import { CreateLessonSchema, EditLessonSchema } from "./schemas";
import { replaceTokenUrl } from "../../../utils/string";
import { revalidatePath } from "next/cache";

export function getApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_FRONTEND || "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}


export const createLessonAction = async (
  formData: CreateLessonSchema,
  queryCourseId: number
) => {
  const { ["upload-video"]: uploadVideo, ...body } = formData;
  const formVideo = new FormData();
  formVideo.set("upload-video", uploadVideo);
  try {
    const res = await fetch(getApiUrl("/api/upload-video"), {
      method: "POST",
      body: formVideo,
    });

    if (res.ok) {
      const responseVideo = await res.json();
      return createDataLesson(body, responseVideo, queryCourseId);
    }
  } catch (err) {
    return {
      success: false,
      message: "_error from upload video",
      errors: err,
    };
  }
};

export const createDataLesson = async (_data, queryCourseId: number, video) => {
  try {
    await requestHandler({
      url: ENDPOINT.CREATE_LESSON,
      method: "POST",

      body: {
        title: _data.title,
        description: _data.description,
        video_url: video?.secure_url || "",
        is_free: false,
        course_id: queryCourseId,
      },
    });

    revalidatePath("/(core)/dashboard", "layout");

    return {
      success: true,
      message: "_success All process",
      errors: "",
    };
  } catch (error) {
    console.log({ error });
    return {
      success: false,
      message: "_error from save lesson",
      errors: "",
    };
  }
};

export const getLessonsByCourse = async (courseId: string) => {
  const url = `${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}`;
  const { data: lessons} = await requestHandler({ url });

  return lessons;
};

export const editLessonAction = async (
  formData: Partial<EditLessonSchema>,
  lessonId: number
) => {
  const { ["upload-video"]: uploadVideo, ...body } = formData;
  if (uploadVideo) {
    const formVideo = new FormData();
    formVideo.set("upload-video", uploadVideo);
    try {
      const res = await fetch(apiEndpoints.UPLOAD_VIDEO, {
        method: "POST",
        body: formVideo,
      });

      if (res.ok) {
        const responseVideo = await res.json();
        return editLessonById(body, lessonId, responseVideo);
      }
    } catch (err) {
      return {
        success: false,
        message: "_error from upload video",
        errors: err,
      };
    }
  } else {
    return editLessonById(body, lessonId, undefined);
  }
};

export const editLessonById = async (_data, lessonId: number, video) => {
  try {
    await requestHandler({
      url: replaceTokenUrl(ENDPOINT.UPDATE_LESSON, lessonId),
      method: "PATCH",

      body: {
        ...(_data.title && { title: _data.title }),
        ...(_data?.description && { description: _data.description }),
        ...(video?.secure_url && { video_url: video.secure_url }),
      },
    });

    return {
      success: true,
      message: "_success All process",
      errors: "",
    };
  } catch (error) {
    console.log({ error });
    return {
      success: false,
      message: "_error from save lesson",
      errors: "",
    };
  }
};
