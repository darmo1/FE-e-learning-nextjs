"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { defaultValuesLoginForm } from "./constants";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { requestHandler } from "../../../../../../utils/request-handler";
import { ENDPOINT } from "@/constants/endpoints";

type AuthFormProps = {
  email: string;
  password: string;
};
export const AuthFormWrapper: FC<PropsWithChildren> = ({ children }) => {
  const formMethods = useForm<AuthFormProps>({
    defaultValues: defaultValuesLoginForm,
  });
  const { handleSubmit, watch } = formMethods;
  const email = watch("email");
  const password = watch("password");
  const [formError, setFormError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<AuthFormProps> = async (dataForm) => {
    setIsPending(true);
    try {
      const { data } = await requestHandler({
        url: ENDPOINT.LOGIN,
        method: "POST",
        body: dataForm,
      });

      console.log("Login successful:", data);
      setFormError(false);
      if(data.success){    
        window.location.href = "/";
      }

    } catch (error) {
      setFormError(true);
      console.error("Error during login:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (formError && (email || password)) {
      setFormError(false);
    }
  }, [email, password, formError]);

  return (
    <FormProvider {...formMethods}>
      <form>
        {children}
        <CardFooter className="w-full">
          <div className="flex flex-col  items-center justify-center min-w-1/2 w-full mx-auto my-4">
            <Button
              className="w-full"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button variant="link" className="px-0 font-normal" size="sm">
              Forgot password?
            </Button>
          </div>
        </CardFooter>
      </form>
      {formError && <div>Error en el formulario</div>}
    </FormProvider>
  );
};
