"use client";

import { Button,  } from "@/components/ui/button";
type btnVariantProps = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined

export const BtnCreateCourse = ({ title, className, variant}:{ title: string, className?: string; variant?: btnVariantProps }) => {
  const handleClick = () => {
    window.location.href = `/dashboard/course/create-course`;
  };
  return (
    <Button type="button" onClick={handleClick} variant={variant} className={className}>
      { title }
    </Button>
  );
};


