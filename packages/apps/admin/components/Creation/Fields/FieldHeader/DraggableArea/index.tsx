"use client";

import React, { useCallback, useState } from "react";
import { Lock as LockIcon, Move as MoveIcon } from "react-feather";

import { FieldsType } from "@forms/types/interfaces/field";

import { getFieldLabel } from "@app/utils/fieldsLabels";

interface FieldHeaderProps {
  type: FieldsType;
  isEditable: boolean;
  setDraggable?: (isDraggable: boolean) => void;
}

const DraggableArea: React.FC<FieldHeaderProps> = ({
  setDraggable,
  type,
  isEditable,
}) => {
  const [canDrag, setDrag] = useState(false);

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const handleDrag = useCallback(() => {
    if (setDraggable) {
      setDraggable(true);
      setDrag(true);
    }
  }, [setDraggable]);

  const handleDrop = useCallback(() => {
    if (setDraggable) {
      setDraggable(false);
      setDrag(false);
    }
  }, [setDraggable]);

  const renderIcon = () => {
    if (!isTouchDevice() && setDraggable) {
      return (
        <span
          className={`${
            isEditable ? "text-[lightgray]" : "text-gray-400"
          } flex flex-col leading-3 text-[10px] absolute -left-2 sm:-left-4 scale-[0.8]`}
        >
          <span className="translate-y-1.5">●●</span>
          <span>●●</span>
          <span className="-translate-y-1.5">●●</span>
        </span>
      );
    }

    if (canDrag && setDraggable) {
      return (
        <span className="flex absolute -left-2 sm:-left-4 md:-left-5 text-[lightgray]">
          <MoveIcon size={16} />
        </span>
      );
    }

    return (
      <span className="flex absolute -left-2 sm:-left-4 md:-left-5 text-[lightgray]">
        <LockIcon size={16} />
      </span>
    );
  };

  return (
    <div
      className={`${
        setDraggable ? "cursor-move" : "cursor-inherit"
      } w-full flex items-center justify-start -translate-y-2`}
      onMouseEnter={handleDrag}
      onMouseLeave={handleDrop}
      onTouchStart={handleDrag}
      onTouchEnd={handleDrop}
    >
      {renderIcon()}
      <i className="text-black opacity-50 text-sm ml-3 sm:ml-1">
        {getFieldLabel(type)}
      </i>
    </div>
  );
};

export default DraggableArea;
