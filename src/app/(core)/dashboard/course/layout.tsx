import { getCoursesByUser } from "@/services/courses/actions";

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id: courseId } = await params;
  const courses = await getCoursesByUser();

  return <div>{children}</div>;
}
