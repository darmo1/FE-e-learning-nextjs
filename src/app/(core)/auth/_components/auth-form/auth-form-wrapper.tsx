"use client";

import { FC, PropsWithChildren, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { defaultValuesLoginForm } from "./constants";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/services/users/actions";
import { ROUTES } from "@/constants/routes";

type AuthFormProps = {
  email: string;
  password: string;
};

export const AuthFormWrapper: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formMethods = useForm<AuthFormProps>({
    defaultValues: defaultValuesLoginForm,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<AuthFormProps> = async (credentials) => {
    setFormError(null);
    const result = await loginAction(credentials);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    // Full reload so the root layout re-fetches the user with the new cookie.
    window.location.href = searchParams.get("redirect") ?? ROUTES.HOME;
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {children}

        {formError && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
            role="alert"
          >
            {formError}
          </p>
        )}

        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Iniciar sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="link"
          className="mx-auto px-0 text-sm font-normal text-gray-500 hover:text-gray-900"
          size="sm"
          onClick={() => router.push("/forgot-password")}
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </form>
    </FormProvider>
  );
};
