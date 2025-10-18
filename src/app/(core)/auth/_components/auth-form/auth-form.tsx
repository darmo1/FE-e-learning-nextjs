'use client'

import { CardContent } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { InputField } from "@/components/common/input-field";


export const AuthForm = () => {
  const { register } = useFormContext();

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

      
    </>
  );
};
