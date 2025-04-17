"use client";
import { Conditional } from "@/components/common/conditional";
import React, { FC, PropsWithChildren, useTransition } from "react";
import { useCreateCourse } from "../../@instructor/course/create-course/create-course.context";
import { FormProvider, useForm } from "react-hook-form";
import { createDataLesson } from "@/services/lessons/action";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateLessonSchema,
  createLessonSchema,
} from "@/services/lessons/schemas";
import { useUploadVideo } from "../../../../../../utils/files";
import { toast } from "sonner";

export const CreateLessonFormWrapper: FC<PropsWithChildren<{ isCreatePage?: boolean;  onSuccess?: () => void}>> = ({
  children,
  isCreatePage = false,
  onSuccess
}) => {
  const { currentStep } = useCreateCourse();
  const searchParams = useSearchParams();
  const queryCourseId = searchParams.get("courseId") ?? "";
  const { mutateAsync: uploadVideo, error } = useUploadVideo();
  //@typescript-eslint/no-unused-vars
  const [, startTransition] = useTransition();

  const formMethods = useForm({
    defaultValues: {
      title: "",
      description: "",
      "upload-video": undefined,
      previewMode: "",
    },
    resolver: zodResolver(createLessonSchema),
  });

  const { handleSubmit } = formMethods;

  const handleCreateSubmit = async (data: CreateLessonSchema) => {
    try {
      const { ["upload-video"]: uploadFileVideo, ...dataLesson } = data;
      const video = await uploadVideo(uploadFileVideo);
  
      startTransition(async () => {
        const { success } = await createDataLesson(dataLesson, Number(queryCourseId), video);
        if(success){
          toast.success('Clase creada exitosamente')
          if(onSuccess){
            onSuccess()
          }
        }else{
          toast.warning('Algo falló')
          
        }
      });
    } catch (e) {
      console.log({ e });
      if(error){
        toast.warning('Algo falló uploading file')
      }
      toast.warning('Algo falló')
    }
  };

  return (
   <Conditional test={currentStep === 2 || !isCreatePage}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleCreateSubmit)}>{children}</form>
      </FormProvider>
    </Conditional>
   );
};
