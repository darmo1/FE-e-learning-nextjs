"use client";

import { userRegisterAction } from "@/services/users/actions";
import {
  AuthRegisterProps,
  userRegisterSchema,
} from "@/services/users/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, PropsWithChildren, useActionState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getCheckoutSession } from "./utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const AuthWrapperSuscription: FC<
  PropsWithChildren<{
    product: { name: string; unitAmount: number };
  }>
> = ({ children, product }) => {
  const router = useRouter();
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
    if (
      !state.success &&
      state.error &&
      state.message === "Usuario ya registrado"
    ) {
      toast.error("El usuario ya está registrado. Por favor, inicia sesión.", {
        duration: 5000,
      });
      setTimeout(() => router.push("/auth?error=Usuario ya registrado"), 5000);
    }
    if (!state.success && state.message === "error form") {
      const fieldErrors = state.error as Record<string, string[]>;
      Object.entries(fieldErrors).forEach(([key, value]) => {
        formMethods.setError(key as keyof AuthRegisterProps, {
          type: "manual",
          message: value?.[0] ?? "Campo invalido",
        });
      });
    }

    if (
      !state.success &&
      state.message &&
      state.message === "User already exist"
    ) {
      console.log("User already exist error");
    }

    if (state.success && state.message) {
      getCheckoutSession({ product });
    }
  }, [state.success, state.message, formMethods, state.error, product, router]);

  return (
    <FormProvider {...formMethods}>
      <form action={dispatch} className="col-span-1 col-start-2">
        {children}
      </form>
    </FormProvider>
  );
};
