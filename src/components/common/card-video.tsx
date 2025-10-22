"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EnrollCourseAction } from "@/services/enrollments/action";
import { toast } from "sonner";
import { Conditional } from "./conditional";
import Link from "next/link";

export type CourseCardVideoProps = {
  title: string;
  video_url: string | null;
  id?: string | number;
  href: string;
  courseId: string | number;
};

export const CardVideoCourse = ({
  video_url,
  id,
  href,
  courseId,
  role,
}: CourseCardVideoProps & { role: string }) => {
  const router = useRouter();
  const handleEnrollCourseButton = async (courseId: string | number) => {
    const { success, message } = await EnrollCourseAction(Number(courseId));
    if (success) {
      toast.success(message, {
        duration: 3000,
      });
      router.push(href);
    } else {
      toast.error(message, {
        duration: 3000,
      });
    }
  };


  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      {video_url ? (
        <div className="relative w-full h-72">
          <video
            controls
            className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
            key={id}
          >
            <source src={video_url} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="w-full h-52 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No video available</span>
        </div>
      )}

      <div className="p-4">
        <Conditional test={role === "student"}>
          <Button onClick={() => handleEnrollCourseButton(courseId)}>
            Enroll course
          </Button>
        </Conditional>

        <Conditional test={role === "instructor"}>
          <Link href={`/dashboard/course/create-course?courseId=${courseId}`}>
            <Button>
              Editar curso
            </Button>
          </Link>
        </Conditional>

        <Conditional test={role === "admin"}>
          <div>Admin</div>
        </Conditional>

        <Conditional test={role !== "admin" && role !== "instructor" && role !== "student"}>
        <Link href="/#pricing">Ver planes</Link>
        </Conditional>

        {/* <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p> */}
      </div>
    </div>
  );
};
