"use server";

import { unstable_rethrow } from "next/navigation";
import { requestHandler } from "../../../utils/request-handler";
import { ENDPOINT } from "@/constants/endpoints";
import { CreateLessonSchema, EditLessonSchema } from "./schemas";
import { replaceTokenUrl } from "../../../utils/string";
import { revalidatePath } from "next/cache";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";
import { ActionResult, actionFailure, actionSuccess } from "../types";

type UploadedVideo = { secure_url?: string };
type LessonFields = Omit<CreateLessonSchema, "upload-video">;

export const createDataLesson = async (
  data: LessonFields,
  courseId: number,
  video?: UploadedVideo
): Promise<ActionResult<null>> => {
  try {
    await requestHandler({
      url: ENDPOINT.CREATE_LESSON,
      method: "POST",
      body: {
        title: data.title,
        description: data.description,
        video_url: video?.secure_url ?? "",
        is_free: false,
        course_id: courseId,
      },
    });

    revalidatePath("/(core)/dashboard", "layout");

    return actionSuccess(null, "Clase creada exitosamente");
  } catch (error) {
    // Relanza los redirects de Next (401 -> /auth/refresh) en vez de tragarlos
    unstable_rethrow(error);
    console.error("Error creating lesson:", error);
    return actionFailure("Error creating lesson", error);
  }
};

export const editLessonById = async (
  data: Partial<Omit<EditLessonSchema, "upload-video">>,
  lessonId: number,
  video?: UploadedVideo
): Promise<ActionResult<null>> => {
  try {
    await requestHandler({
      url: replaceTokenUrl(ENDPOINT.UPDATE_LESSON, lessonId),
      method: "PATCH",
      body: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(video?.secure_url && { video_url: video.secure_url }),
      },
    });

    return actionSuccess(null, "Clase actualizada exitosamente");
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error editing lesson:", error);
    return actionFailure("Error editing lesson", error);
  }
};

export const getLessonsByCourse = async (courseId: string) => {
  const { data: lessons } = await requestHandler<LessonsProps[]>({
    url: `${ENDPOINT.GET_LESSONS_BY_COURSE}/${courseId}`,
  });
  return lessons;
};
