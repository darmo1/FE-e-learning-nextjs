"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { CourseContextProps, CourseProviderProps } from "./types";

const CourseContext = createContext<CourseContextProps>({
  courses: [],
  lessons: [],
});
export const useCourses = () => useContext(CourseContext);

export const CourseProvider: FC<PropsWithChildren<CourseProviderProps>> = ({
  children,
  courses,
  lessons,
}) => {
  const props = useMemo(
    () => ({
      courses,
      lessons,
    }),
    [courses, lessons]
  );
  return (
    <CourseContext.Provider value={props}>{children}</CourseContext.Provider>
  );
};
