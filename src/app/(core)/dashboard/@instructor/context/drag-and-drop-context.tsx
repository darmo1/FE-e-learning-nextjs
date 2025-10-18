"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import { LessonsProps } from "../../course/types";
import { arrayMove } from "@dnd-kit/sortable";

type DragLessonsContextType = {
  optimisticState: LessonsProps[];
  addOptimistic: (value: LessonsProps[]) => void;
};

const DragLessonsContext = createContext<DragLessonsContextType>({
  optimisticState: [],
  addOptimistic: () => {},
});

export const useDragLessons = () => useContext(DragLessonsContext);

export const DragAndDropContext = ({
  children,
  lessons,
}: {
  children: React.ReactNode;
  lessons: LessonsProps[];
}) => {
 // const [optimisticState, addOptimistic] = useOptimistic(lessons, updateFn);
  const [optimisticState, addOptimistic] = useState<LessonsProps[]>(lessons);

  console.log({ optimisticState }, "##optimisticState 🎉🤓");
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    console.log({ event }, "##event");
    const { active, over } = event;
    if (!over || active.id === over.id) {

      return;
    }

    const oldIndex = optimisticState.findIndex(
      (item) => item.id!.toString() === active.id
    );
    const newIndex = optimisticState.findIndex(
      (item) => item.id!.toString() === over.id
    );

    const reordered: LessonsProps[] = arrayMove(
      optimisticState,
      oldIndex,
      newIndex
    );
    const updated = reordered.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    startTransition(() => addOptimistic(updated));

  };

  const props = useMemo(
    () => ({ optimisticState, addOptimistic }),
    [optimisticState, addOptimistic]
  );

  return (
    <DragLessonsContext.Provider value={props}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
       {children}
      </DndContext>
    </DragLessonsContext.Provider>
  );
};

function updateFn(currentState, optimisticValue: LessonsProps[]) {
  console.log({ currentState, optimisticValue }, "##updateFn");
  return optimisticValue.length ? optimisticValue : currentState;
;
}
