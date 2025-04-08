"use client";

import Image from "next/image";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { Conditional } from "./conditional";
import { Button } from "../ui/button";

export type CourseCardProps = {
  id?: string | number;
  price?: number;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  href?: string;
};

export const CardCourse = ({
  id: courseId,
  category,
  description,
  image_url,
  title,
  price = 0,
  href = "#",
}: CourseCardProps) => {
  return (
    <Link href={href} key={uuid()} className="group">
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
            <Conditional test={!!price}>
              <span className="text-lg font-bold">${price}</span>
            </Conditional>
          </div>
        </div>
      </div>
    </Link>
  );
};
