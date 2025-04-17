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
    <div>
      <InputField
        label={TITLE_LESSON}
        {...register("title")}
        placeholder="Enter your description"
        errorMessage={
          errors?.title?.message
            ? String(errors?.description?.message)
            : ""
        }
        required
      />

      <InputField
        label={DESCRIPTION_LESSON}
        {...register("description")}
        className="min-h-28 flex justify-items-start items-start"
        placeholder="Enter your description"
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
