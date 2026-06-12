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
import { Button } from "@/components/ui/button";

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
        <form
          onSubmit={handleSubmit(_onSubmit)}
          className="flex flex-col gap-6"
        >
          {children}

          <div className="flex max-w-2xl justify-end border-t border-gray-200 pt-5">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  {isEditPage ? "Guardar cambios" : "Crear curso y continuar"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Conditional>
  );
};
