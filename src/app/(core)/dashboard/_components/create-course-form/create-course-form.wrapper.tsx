"use client";
import { Conditional } from "@/components/common/conditional";
import React, { FC, PropsWithChildren, useTransition } from "react";
import { useCreateCourse } from "../../@instructor/course/create-course/create-course.context";
import { FormProvider, useForm } from "react-hook-form";
import {
  createCourseAction,
  editCourseAction,
} from "@/services/courses/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCourseProps,
  createCourseSchema,
} from "@/services/courses/schemas";
import { CreateCourseFormWrapperProps } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, LoaderCircle } from "lucide-react";

export const CreateCourseFormWrapper: FC<
  PropsWithChildren<{
    course: CreateCourseFormWrapperProps;
    isEditPage?: boolean;
  }>
> = ({ children, course, isEditPage = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryCourseId = searchParams.get("courseId") ?? "";
  const { currentStep, setCurrentStep } = useCreateCourse();

  const formMethods = useForm({
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      price: course?.price || 0,
      category: course?.category || "",
      image: undefined,
      previewMode: course.image_url || "",
    },
    resolver: zodResolver(createCourseSchema),
  });
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = formMethods;

  const [isPending, startTransition] = useTransition();

  const _onSubmit = (data: CreateCourseProps) => {
    startTransition(async () => {
      if (queryCourseId) {
        const changedData: Partial<CreateCourseProps> = {};
        for (const key in data) {
          if (dirtyFields[key]) {
            changedData[key] = data[key];
          }
        }
        const { success } = await editCourseAction(changedData, queryCourseId);
        if (success) {
          toast.success("El curso ha sido actualizado exitosamente", {});
        }
      } else {
        const { success, data: course } = await createCourseAction(data);
        if (success) {
          setCurrentStep(2);
          const currentPath = window.location.pathname;
          const newUrl = `${currentPath}?courseId=${course?.id}`;
          router.push(newUrl);
        }
      }
    });
  };

  return (
    <Conditional test={currentStep === 1}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(_onSubmit)}>
          {children}

          <div
            className={`${
              isPending ? "bg-black/75" : "bg-black"
            } border text-white flex px-4 py-2 rounded-md w-fit  ms-auto me-0 items-center `}
          >
            <input
              type="submit"
              value={
                isEditPage
                  ? "Editar curso"
                  : "Create Course & Continue to Lessons"
              }
              disabled={isPending}
            />
            {isPending ? <LoaderCircle  className="w-4 h-4 text-white ms-2 animate-spin" /> : <ArrowRight className="w-4 h-4 text-white ms-2" />  }
          </div>
        </form>
      </FormProvider>
    </Conditional>
  );
};
