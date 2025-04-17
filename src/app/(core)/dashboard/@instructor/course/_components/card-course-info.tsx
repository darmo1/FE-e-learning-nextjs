"use client";
import { Course } from "@/app/(core)/home/_components/my-courses/types";
import { Conditional } from "@/components/common/conditional";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import React from "react";

export const CardCourseInfo = ({
  category,
  description,
  image_url,
  title,
  price,
}: Course) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div className="col-span-1">
            <Heading title={title} description={description} />
            <div className="my-2">
              <CardTitle className="my-1">Categoria</CardTitle>
              <CardDescription>{category}</CardDescription>
            </div>
            <div className="my-2">
              <CardTitle className="my-1">Precio</CardTitle>
              <CardDescription>$ {price}</CardDescription>
            </div>
          </div>
          <div className="col-span-1">
            <Conditional test={Boolean(image_url)}>
              <div className="my-2">
                <CardTitle className="my-1">Imagen</CardTitle>
                <Image
                  src={image_url!}
                  alt="Preview"
                  width={240}
                  height={135}
                />
              </div>
            </Conditional>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
