"use client";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

export const AuthRegister = () => {
  const { register } = useFormContext();
  const { pending } = useFormStatus();
  return (
    <>
      <CardContent className="space-y-4">
        <InputField
          label="Full Name"
          {...register("fullName")}
          placeholder="John Doe"
          required
        />
        <InputField
          type="email"
          label="Email"
          {...register("email")}
          placeholder="name@example.com"
          required
        />

        <InputField
          type="password"
          label="password"
          {...register("password")}
          placeholder="*****"
          required
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </>
  );
};
