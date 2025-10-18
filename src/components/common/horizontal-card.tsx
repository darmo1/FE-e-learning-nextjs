import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuid } from "uuid";
import { Conditional } from "./conditional";

export type CardProps = {
  id?: string | number;
  price?: number;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  href: string;
};

export const HorizontalCard = ({
  href,
  category,
  description,
  image_url,
  title,
  price,
}: CardProps) => {
  const DescriptionCard = () => (
    <div className="w-1/2 px-4">
      <h2 className="text-lg font-semibold truncate">{title}</h2>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-blue-500">{category}</span>
        <Conditional test={!!price}>
          <span className="text-lg font-bold">${price}</span>
        </Conditional>
      </div>
    </div>
  );

  return (
    <Link href={href} key={uuid()} className="group block">
      <div
        className="flex border rounded-2xl overflow-hidden h-48 
          hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative w-1/2 h-full">
          {image_url ? (
            <Image
              src={image_url}
              alt={title}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Sin imagen</span>
            </div>
          )}
        </div>
        <DescriptionCard />
      </div>
    </Link>
  );
};
