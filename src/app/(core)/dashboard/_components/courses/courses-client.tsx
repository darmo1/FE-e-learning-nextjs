import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuid } from "uuid";

type CoursesProps = {
  id?: string | number;
  price: number;
  title: string;
  description: string;
  category: string;
  image_url: string | null
};

export const CoursesClient = (
  { courses }: { courses: CoursesProps[] } = { courses: [] }
) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map(({ category, description, price, title, id: courseId, image_url }) => (
        <Link href={`/dashboard/course/${courseId}`} key={uuid()} className="group">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
            {image_url ? (
              <div className="relative w-full h-52">
                <Image 
                  src={image_url} 
                  alt={title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-full h-52 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold truncate">{title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-blue-500">{category}</span>
                <span className="text-lg font-bold">${price}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
