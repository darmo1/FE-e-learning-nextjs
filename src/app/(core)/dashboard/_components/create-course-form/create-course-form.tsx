"use client";
import { InputField } from "@/components/common/input-field";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CATEGORY, COURSE_TITLE, DESCRIPTION_COURSE, PRICE } from "./constant";

import { Conditional } from "@/components/common/conditional";
import Image from "next/image";
import { Upload } from "lucide-react";

export const CreateCourseForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
    watch,
  } = useFormContext();

  const inputImage = watch("previewMode");
  const [selectedImage, setSelectedImage] = useState<string | null>(inputImage || "");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue("image", file, { shouldValidate: true });
        setSelectedImage(e.target?.result as string);
        trigger("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setValue("image", null);
    clearErrors("image");
  };

  return (
    <div className="flex flex-col">
      <InputField
        label={COURSE_TITLE}
        placeholder="Enter course"
        {...register("title")}
        errorMessage={
          errors?.title?.message ? String(errors?.title?.message) : ""
        }
        required
      />

      <InputField
        label={DESCRIPTION_COURSE}
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
      <InputField
        label={CATEGORY}
        {...register("category")}
        placeholder="Enter your description"
        errorMessage={
          errors?.category?.message ? String(errors?.category?.message) : ""
        }
        required
      />
      <InputField
        label={PRICE}
        type="number"
        {...register("price", { valueAsNumber: true })}
        errorMessage={
          errors?.price?.message ? String(errors?.price?.message) : ""
        }
        placeholder="Enter your description"
        required
      />

      <div
        className={` ${
          selectedImage ? "" : "border border-gray-300"
        } rounded-md relative px-2 py-1 my-4`}
      >
        <Conditional test={!!selectedImage}>
          <div className="relative md:max-w-[200px]">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <Image
              src={selectedImage!}
              alt="Preview"
              width={240}
              height={135}
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        </Conditional>

        <div className="gap-2">
          <Conditional test={!selectedImage}>
            <label>Image</label>
            <div className="flex justify-center items-center">
              <Upload className="w-5 h-5 " />

              <input
                {...register("image", {
                  onChange: handleImageChange,
                })}
                className="ml-4 cursor-pointer file:rounded file:border file:px-4 file:py-2 file:bg-blue-500 file:text-white"
                type="file"
                placeholder="Upload image"
                accept="image/*"
                required
              />
            </div>
          </Conditional>
        </div>
        <div className="font-semibold text-red-500">
          {errors?.image?.message ? String(errors?.image?.message) : ""}
        </div>
      </div>
    </div>
  );
};
