"use client";
import { userLogin } from "@/services/users/actions";
import { FC, PropsWithChildren, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { defaultValuesLoginForm } from "./constants";

type AuthFormProps = {
  email: string;
  password: string;
};
export const AuthFormWrapper: FC<PropsWithChildren> = ({ children }) => {

  const formMethods = useForm<AuthFormProps>({
    defaultValues: defaultValuesLoginForm,
  });
  const { handleSubmit } = formMethods;
  const [formError, setFormError] = useState(false);

  const onSubmit: SubmitHandler<AuthFormProps> = async (data) => {
    const { success, message } = await userLogin(data);
    if (success) {
      // router.push("/");
      window.location.href = "/";
      return;
    }

    if (!success && message) {
      setFormError(true);
      return;
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      {formError && <div>Error en el formulario</div>}
    </FormProvider>
  );
};
