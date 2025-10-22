"use client";

import { Button } from "@/components/ui/button";
import { forgotPasswordAction } from "@/services/password/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, {
  FC,
  PropsWithChildren,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schemaEmail = z.object({
  email: z.string().email(),
});

export const WrapperForgotPasswordForm: FC<PropsWithChildren> = ({
  children,
}) => {
  const formMethods = useForm({
    defaultValues: {
      email: "",
      resolver: zodResolver(schemaEmail),
    },
  });

  const { register, handleSubmit } = formMethods;

  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    data: "",
    error: true,
  });

  const onSubmit = async (data: z.infer<typeof schemaEmail>) => {
    startTransition(() => formAction({ email: data.email }));
  };

  useEffect(() => {
    if (!state.error) {
      toast.success(
        `Hemos enviado un correo electrónico 📧 a la dirección ${state?.email}, revisa para resetear tu contraseña`,
        {
          position: "top-center",
          duration: Infinity,
          action: {
            label: "cerrar",
            onClick: () => toast.dismiss(),
          },
          description: () => <div>Revisalo 🎉</div>,
        }
      );
    } else if (state.error && state.data) {
      toast.warning("Algo salió mal, intentalo mas tarde 💥");
    }
  }, [state]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 flex flex-col 
        order border-white/20 
        backdrop-blur-md shadow-xl p-4 rounded-md mx-auto" 
      >
        {children}
        <label className="font-semibold">Correo</label>
        <input
          {...register("email")}
          className="bg-white/10 border border-gray-400   rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
          placeholder="Email"
        />

        <Button
          type="submit"
          variant={"default"}
          className={`${isPending ? "bg-black/70" : ""} my-3`}
        >
          Enviar{" "}
          {isPending ? (
            <LoaderCircle className="w-4 h-4 text-white ms-2 animate-spin" />
          ) : (
            <div className="w-4 h-4 not-first:ms-2" />
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
