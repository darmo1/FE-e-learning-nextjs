'use client';
import { InputField } from "@/components/common/input-field";
import { VideoUploader } from "@/components/video/video-uploader";
import React from "react";
import { useFormContext } from "react-hook-form";
import { DESCRIPTION_LESSON, TITLE_LESSON } from "./constants";

export const CreateLessonForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <InputField
        label={TITLE_LESSON}
        {...register("title")}
        placeholder="Ej. Configurando el entorno"
        errorMessage={
          errors?.title?.message ? String(errors?.title?.message) : ""
        }
        required
      />

      <InputField
        label={DESCRIPTION_LESSON}
        {...register("description")}
        placeholder="¿De qué trata esta lección?"
        errorMessage={
          errors?.description?.message
            ? String(errors?.description?.message)
            : ""
        }
        required
      />

      <VideoUploader />
    </div>
  );
};
