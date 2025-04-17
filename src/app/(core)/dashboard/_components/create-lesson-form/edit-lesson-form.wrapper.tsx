"use client";

import { FC, PropsWithChildren, startTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LessonsProps } from "../../course/types";
import { EditLessonSchema, editLessonSchema } from "@/services/lessons/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadVideo } from "../../../../../../utils/files";
import { editLessonById } from "@/services/lessons/action";

type EditLessonFormWrapper = PropsWithChildren<{
  lesson?: LessonsProps;
}>;

export const EditLessonFormWrapper: FC<EditLessonFormWrapper> = ({
  children,
  lesson,
}) => {
  const { mutateAsync: uploadVideo } = useUploadVideo();
  const formMethods = useForm({
    defaultValues: {
      title: lesson?.title || "",
      description: lesson?.description || "",
      "upload-video": undefined,
      previewMode: lesson?.video_url || "",
    },
    resolver: zodResolver(editLessonSchema),
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = formMethods;

  const handleEditSubmit = async (data: Partial<EditLessonSchema>) => {
    let video = undefined;
    const changedData: Partial<LessonsProps> = {};

    if (data["upload-video"]) {
      try {
        video = await uploadVideo(data["upload-video"]);
      } catch (err) {
        console.log({ err });
      }
    }

    for (const key in data) {
      if (dirtyFields[key]) {
        changedData[key] = data[key];
      }
    }

    startTransition(async () => {
      await editLessonById(changedData, Number(lesson!.id), video);
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleEditSubmit)}>{children}</form>
    </FormProvider>
  );
};
