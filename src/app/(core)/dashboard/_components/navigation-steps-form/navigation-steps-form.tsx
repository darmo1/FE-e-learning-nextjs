"use client";


import { useCreateCourse } from "../../@instructor/course/create-course/create-course.context";

export const NavigationStepsForm = () => {
    const { currentStep , setCurrentStep } = useCreateCourse();

    const changeNumber = ( num : number) => {
      setCurrentStep(num)
    }

  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-full border-2
          ${
            currentStep === 1
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary bg-primary text-primary-foreground"
          }`}
          onClick={() => changeNumber(1)}
        >
          1
        </div>
        <div className={`h-1 w-20 ${true ? "bg-primary" : "bg-muted"}`} />
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-full border-2",
          ${
            currentStep === 2
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted bg-muted text-muted-foreground"
          }`}
          onClick={() => changeNumber(2)}
        >
          2
        </div>
      </div>
      <div className="flex text-sm mt-2">
        <div className="w-8 text-center">Course</div>
        <div className="w-20" />
        <div className="w-8 text-center">Lessons</div>
      </div>
    </div>
  );
};
