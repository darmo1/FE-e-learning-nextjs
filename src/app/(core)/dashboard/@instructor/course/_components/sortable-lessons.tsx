"use client";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CardLessonDraggable } from "./card-lesson-dragable";
import { useDragLessons } from "../../context/drag-and-drop-context";

export const SortableLessons = () => {
  const { optimisticState: lessons } = useDragLessons();

  return (
    <SortableContext
      items={lessons.map((l) => l.id!)}
      strategy={verticalListSortingStrategy}
    >
      {lessons.map(({ title, is_free, description = "", position, id }) => (
       <CardLessonDraggable
          key={id!}
          title={title}
          is_free={is_free}
          description={description}
          position={position}
          id={id!}
        />
      ))}
    </SortableContext>
  );
};
