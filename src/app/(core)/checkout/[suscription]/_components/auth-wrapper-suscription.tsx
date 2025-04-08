"use client";

import { checkoutAction } from "@/services/checkout/action";
import { userRegisterAction } from "@/services/users/actions";
import {
  AuthRegisterProps,
  userRegisterSchema,
} from "@/services/users/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, PropsWithChildren, useActionState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getCheckoutSession } from "./utils";

export const AuthWrapperSuscription: FC<
  PropsWithChildren<{
    product: { name: string; unitAmount: number };
  }>
> = ({ children, product }) => {
  const formMethods = useForm<AuthRegisterProps>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const [state, dispatch] = useActionState(userRegisterAction, {
    success: false,
    error: null,
    data: null,
    message: "",
  });

  useEffect(() => {
    //first errors validation form
    if (!state.success && state.message === "error form") {
      const fieldErrors = state.error as Record<string, string[]>;
      Object.entries(fieldErrors).forEach(([key, value]) => {
        formMethods.setError(key as keyof AuthRegisterProps, {
          type: "manual",
          message: value?.[0] ?? "Campo invalido",
        });
      });
    }

    if (state.success && state.message) {
        getCheckoutSession({product});
    }
  }, [state.success, state.message, formMethods, state.error, product]);

  return (
    <FormProvider {...formMethods}>
      <form action={dispatch}>{children}</form>
    </FormProvider>
  );
};
