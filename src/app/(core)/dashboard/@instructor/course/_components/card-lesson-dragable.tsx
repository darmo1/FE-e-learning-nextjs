"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { VideoIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";

export const CardLessonDraggable = ({
  id,
  title,
  description,
  is_free,
  position,
}: {
  title: string;
  description?: string;
  is_free: boolean;
  position: number;
  id: number | string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 50 : "auto",
  };
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={clsx(
        "cursor-grab active:cursor-grabbing",
        isDragging && "rotate-[1deg] scale-[1.02]"
      )}
    >
      <Card className={clsx(
          "border border-gray-200 mb-2 px-4 transition-all duration-150 ",
          isDragging
            ? "shadow-xl ring-2 ring-primary/30 bg-muted/60"
            : "shadow-sm hover:shadow-md"
        )}>
        <div className="flex-1 ">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {position}
            </span>
            <div>
            <h5 className="text-md font-semibold">{title}</h5>
            <p className="text-sm text-muted-foreground mt-">{description}</p>
            </div>
          </div>
          
        </div>
        <div className="flex flex-wrap gap-2  sm:mt-0">
          <Badge variant="outline" className="flex items-center gap-1">
            <VideoIcon className="w-12 h-12" />
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {is_free ? "free" : "payment"}
          </Badge>
        </div>
      </Card>
    </div>
  );
};
