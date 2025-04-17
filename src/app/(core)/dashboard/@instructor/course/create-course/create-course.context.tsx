"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type CreateCourseProps = {
  currentStep: number;
  setCurrentStep: (_: number) => void;
};

const CreateCourseContext = createContext<CreateCourseProps | undefined>(undefined);
export const useCreateCourse = () => {
    const context = useContext(CreateCourseContext);
    if(!context) throw new Error('useCreateCourse debe usarse dentro de CourseProvider')
    return context
}

export const CourseContextProvider: FC<
  PropsWithChildren<{ initialStep?: number }>
> = ({ children, initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  return (
    <CreateCourseContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CreateCourseContext.Provider>
  );
};
