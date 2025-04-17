// "use client";

// import { usePathname } from "next/navigation";

export default function LayoutInstructor({
  children,
}: {
  children: React.ReactNode;
}) {
  //const path = usePathname();

  // const createCoursePage = ["/dashboard/course/create-course"].includes(path);
  // if (createCoursePage) return;
  return <div>{children}</div>;
}
