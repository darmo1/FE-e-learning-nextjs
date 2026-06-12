import React from "react";
import { Conditional } from "./conditional";
import { cn } from "@/lib/utils";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  name: string;
  label: string;
  errorMessage?: string | undefined;
  id?: string;
  className?: string;
  required?: boolean;
};

export const InputField = ({
  type = "text",
  name,
  label,
  id,
  className = "",
  errorMessage,
  required = false,
  ...rest
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id || name}
        className="text-sm font-medium text-gray-900"
      >
        {label}
        {required ? <span className="ml-0.5 text-gray-400">*</span> : null}
      </label>

      <input
        type={type}
        id={id || name}
        name={name}
        className={cn(
          type === "file"
            ? "text-sm text-gray-600 file:mr-3 file:rounded-md file:border file:border-gray-200 file:bg-gray-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100"
            : "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-50",
          errorMessage && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
          className
        )}
        {...rest}
      />
      <Conditional test={Boolean(errorMessage)}>
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      </Conditional>
    </div>
  );
};
