import React from "react";
import { Conditional } from "./conditional";

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
    <div className="my-4 flex flex-col">
      <label className="font-semibold text-sm">
        {label} {required ? <span className="text-red-500"> * </span> : null}{" "}
      </label>
   
      <input
        type={type}
        id={id || name}
        name={name}
        className={`${className} ${type === 'file' ? '' : 'border' } inline-block min-w-44 px-4 py-2 rounded-sm mt-1 
          ${errorMessage ? "text-red-500 border-red-500" : null}
          `}
        {...rest}
      />
      <Conditional test={Boolean(errorMessage)}>
        <div className="font-semibold text-red-500">{errorMessage}</div>
      </Conditional>
    </div>
  );
};
