"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useCreateCourse } from "../../@instructor/course/create-course/create-course.context";

const STEPS = [
  { number: 1, label: "Curso" },
  { number: 2, label: "Lecciones" },
];

export const NavigationStepsForm = () => {
  const { currentStep, setCurrentStep } = useCreateCourse();

  return (
    <nav aria-label="Pasos del formulario" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map(({ number, label }, index) => {
          const isActive = currentStep === number;
          const isDone = currentStep > number;
          return (
            <li key={number} className="flex items-center">
              {index > 0 && (
                <span
                  className={cn(
                    "mx-3 h-px w-16",
                    currentStep > index ? "bg-gray-900" : "bg-gray-200"
                  )}
                />
              )}
              <button
                type="button"
                onClick={() => setCurrentStep(number)}
                className="group flex items-center gap-2.5"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                    isActive
                      ? "border-gray-900 bg-gray-900 text-white"
                      : isDone
                      ? "border-gray-900 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-400 group-hover:border-gray-400"
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : number}
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    isActive
                      ? "font-medium text-gray-900"
                      : "text-gray-500 group-hover:text-gray-900"
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
