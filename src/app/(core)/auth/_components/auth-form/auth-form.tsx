'use client'

import { CardContent, CardFooter } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2 } from "lucide-react";

export const AuthForm = () => {
  const { register } = useFormContext();
  const { pending } = useFormStatus();

  return (
    <>
      <CardContent className="space-y-4">
        <InputField
          label="Email"
          type="email"
          {...register("email")}
          placeholder="name@example.com"
          required
          autoComplete="email"
          className="border px-4 py-2 rounded-sm"
        />

        <InputField
          label="Password"
          id="password-login"
          {...register("password")}
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password ***"
          className="border px-4 py-2 rounded-sm"
        />

        <hr />
      </CardContent>

      <CardFooter className="w-full">
        <div className="flex flex-col  items-center justify-center min-w-1/2 w-full mx-auto my-4">
          <Button className="w-full" disabled={pending} type="submit">
            {pending ? (
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
    </>
  );
};
