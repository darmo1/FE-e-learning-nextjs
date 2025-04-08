"use client";
import { Conditional } from "@/components/common/conditional";
import React, { FC, PropsWithChildren, useTransition } from "react";
import { useCreateCourse } from "../../create-course/create-course.context";
import { FormProvider, useForm } from "react-hook-form";
import { createCourseAction } from "@/services/courses/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCourseProps,
  createCourseSchema,
} from "@/services/courses/schemas";

export const CreateCourseFormWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const { currentStep, setCurrentStep } = useCreateCourse();
  const formMethods = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: undefined
    },
    resolver: zodResolver(createCourseSchema),
  });

  const [isPending, startTransition] = useTransition();

  const _onSubmit = (data: CreateCourseProps) => {
    startTransition(async () => {
      const { success } = await createCourseAction(data);
      if(success){
        setCurrentStep(2)
      }
    });
  };

  return (
    <Conditional test={currentStep === 1}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(_onSubmit)}>
          {children}

          <input
            type="submit"
            className="bg-black border text-white px-4 py-2 rounded-md w-1/3 flex mr-0 m-auto"
            value="Create Course & Conttinue to Lessons"
            disabled={isPending}
          />
          {isPending ? <div>...Loading</div> : null}
        </form>
      </FormProvider>
    </Conditional>
  );
};
