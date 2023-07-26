"use client";

import { useState } from "react";

import { MakeOptional } from "@forms/types/global/makeOptional";
import { TextFormProps } from "@forms/types/interfaces/field";

import { useFieldsBase } from "../hooks/useFieldsBase";

export type ValueProps = MakeOptional<TextFormProps, "id" | "type">;

interface FieldsBaseProps {
  id: string;
}

const useDates = ({ id }: FieldsBaseProps) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    isRequired: false,
    max: "",
    min: "",
  });

  const {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    handleLimitsChange,
  } = useFieldsBase({
    id,
    value,
    setValue,
  });

  return {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    handleLimitsChange,
    value,
  };
};

export { useDates };
