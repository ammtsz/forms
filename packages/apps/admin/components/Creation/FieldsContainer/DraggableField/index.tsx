"use client";

import { Flex } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";

import { getPrefixFromString } from "@forms/utils";

import { getFieldComponent } from "@app/utils/getFieldComponent";

const DraggableField = ({ fieldId, isDisabled }) => {
  const [isDraggable, setDraggable] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fieldId, disabled: !isDraggable });

  const Component = getFieldComponent(getPrefixFromString(fieldId));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Flex
      key={fieldId}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      direction="column"
      pt={[2, 4, 4]}
      pb={[8, 8, 12]}
      px={[4, 6, 8]}
      my={[4, 6, 8]}
      bg={isDragging ? "blackAlpha.300" : "blackAlpha.100"}
      borderRadius="10"
      width="100%"
      cursor={"inherit"}
    >
      <Component
        id={fieldId}
        isDisabled={isDisabled}
        setDraggable={setDraggable}
      />
    </Flex>
  );
};

export default DraggableField;
