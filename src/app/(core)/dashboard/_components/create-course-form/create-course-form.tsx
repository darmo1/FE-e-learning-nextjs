"use client";
import { InputField } from "@/components/common/input-field";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CATEGORY, COURSE_TITLE, DESCRIPTION_COURSE, PRICE } from "./constant";

import { Conditional } from "@/components/common/conditional";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(
    inputImage || ""
  );

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
    <div className="flex max-w-2xl flex-col gap-5">
      <InputField
        label={COURSE_TITLE}
        placeholder="Ej. Introducción a React"
        {...register("title")}
        errorMessage={
          errors?.title?.message ? String(errors?.title?.message) : ""
        }
        required
      />

      <InputField
        label={DESCRIPTION_COURSE}
        {...register("description")}
        placeholder="¿Qué van a aprender tus estudiantes?"
        errorMessage={
          errors?.description?.message
            ? String(errors?.description?.message)
            : ""
        }
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label={CATEGORY}
          {...register("category")}
          placeholder="Ej. Desarrollo web"
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
          placeholder="0 = curso gratuito"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-gray-900">
          Imagen de portada<span className="ml-0.5 text-gray-400">*</span>
        </span>

        <Conditional test={!!selectedImage}>
          <div className="relative w-fit overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={selectedImage!}
              alt="Vista previa de la portada"
              width={320}
              height={180}
              className="aspect-video object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Quitar imagen"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Conditional>

        <Conditional test={!selectedImage}>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-6 py-10 text-center transition-colors hover:border-gray-400 hover:bg-gray-50">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
              <ImagePlus className="h-5 w-5 text-gray-400" />
            </span>
            <span className="text-sm font-medium text-gray-900">
              Sube la portada del curso
            </span>
            <span className="text-xs text-gray-500">
              PNG o JPG, idealmente 1280×720
            </span>
            <input
              {...register("image", {
                onChange: handleImageChange,
              })}
              className="sr-only"
              type="file"
              accept="image/*"
              required
            />
          </label>
        </Conditional>

        {errors?.image?.message && (
          <p className="text-sm text-red-600" role="alert">
            {String(errors.image.message)}
          </p>
        )}
      </div>
    </div>
  );
};
