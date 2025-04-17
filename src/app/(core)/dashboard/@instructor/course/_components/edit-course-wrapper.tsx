
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, PropsWithChildren } from "react";

export const EditCourseWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Course Details</TabsTrigger>
        <TabsTrigger value="classes">Lessons</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
