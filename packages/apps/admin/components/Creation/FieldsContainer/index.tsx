"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";

import { useFormCreation } from "@app/store/formCreation";

import DraggableField from "./DraggableField";

const FieldsContainer = ({ isDisabled = false }) => {
  const { fieldsIds, sortFields } = useFormCreation();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.data.current && active.data.current) {
      sortFields(String(active.id), over.data.current.sortable.index);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fieldsIds} strategy={verticalListSortingStrategy}>
        {fieldsIds.map((fieldId) => (
          <DraggableField
            key={fieldId}
            fieldId={fieldId}
            isDisabled={isDisabled}
          />
        ))}
      </SortableContext>
      <DragOverlay />
    </DndContext>
  );
};

export default FieldsContainer;
