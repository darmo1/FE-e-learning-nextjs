"use client";
import { Conditional } from "@/components/common/conditional";
import React, { FC, PropsWithChildren, useActionState, useEffect } from "react";
import { useCreateCourse } from "../../create-course/create-course.context";
import { FormProvider, useForm } from "react-hook-form";
import { createLessonAction } from "@/services/lessons/action";
import { isEmpty } from "../../../../../../../utils/common";


export const CreateLessonFormWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const { currentStep } = useCreateCourse();
  const formMethods = useForm({
    defaultValues: {
      title: "",
      description: "",
      "upload-video": "",
    },
  });
  const { setError } = formMethods
  const [state, dispatchAction, pending] = useActionState(
    createLessonAction,
    null
  );

  useEffect(() => {
    if(!state) return
    if(!isEmpty(state?.errors)){
      Object.entries(state.errors).forEach(([field, error]) => {
        setError(field as "title" | "description" | "upload-video", {
          type: "manual",
          message: error[0], // Asegúrate de que `error` tiene una propiedad `message`
        });
      });
    }
  }, [state, setError])

  const _action = async () => {
    const _formData = formMethods.getValues();
    const form = new FormData();
    form.append("title", _formData.title);
    form.append("description", _formData.description);
    form.append("upload-video", _formData["upload-video"]);

    dispatchAction(form);
  }; // Se ajusta para que siempre devuelva `void | Promise<void>`

  return (
    <Conditional test={currentStep === 2}>
      <FormProvider {...formMethods}>
        <form action={_action}>{children}</form>
      </FormProvider>
    </Conditional>
  );
};
