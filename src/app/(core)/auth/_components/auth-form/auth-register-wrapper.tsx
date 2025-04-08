"use client";
import { userRegisterAction } from "@/services/users/actions";
import {
  AuthRegisterProps,
  userRegisterSchema,
} from "@/services/users/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useActionState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const AuthRegisterWrapper: FC<PropsWithChildren> = ({ children }) => {
  const formMethods = useForm<AuthRegisterProps>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const [state, dispatch ] = useActionState(userRegisterAction, {
    success: false,
    error: null,
    data: null,
    message: "",
  });



  useEffect(() => {
    if (state.success && state.message) {
      formMethods.reset();
      toast.success(state.message, {
        position: "top-center",
        icon: "✅",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
        closeButton: true,
        duration: 5000,
        
      })
    }
  }, [state.success, state.message, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form action={dispatch}>{children}</form>
    </FormProvider>
  );
};
