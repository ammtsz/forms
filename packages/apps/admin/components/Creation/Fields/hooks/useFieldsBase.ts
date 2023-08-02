"use client";

import { useFormCreation } from "@/store/formCreation";
import React, { useCallback } from "react";

import { MakeOptional } from "@forms/types/global/makeOptional";
import {
  DependsOnProps,
  FieldsType,
  FieldProps,
} from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

export type ValueProps = MakeOptional<FieldProps, "id" | "type">;

interface FieldsBaseProps {
  id: string;
  value: ValueProps;
  setValue: React.Dispatch<React.SetStateAction<ValueProps>>;
}

const useFieldsBase = ({ id, value, setValue }: FieldsBaseProps) => {
  const { deleteField, updateField } = useFormCreation();

  const saveUpdates = useCallback(
    (props = {}) => {
      const type = getPrefixFromString(id) as FieldsType;

      updateField({
        id,
        type,
        ...value,
        ...props,
      });
    },
    [id, value, updateField]
  );

  const handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (event) => {
      setValue((prev) => ({
        ...prev,
        [event.target.name]: event.target.value || "",
      }));
      saveUpdates({ [event.target.name]: event.target.value });
    },
    [saveUpdates, setValue]
  );

  const handleLimitsChange = useCallback(
    (max = "", min = "") => {
      setValue((prev) => ({
        ...prev,
        max,
        min,
      }));

      saveUpdates({ max, min });
    },
    [saveUpdates, setValue]
  );

  const handleCheckbox = useCallback(() => {
    const isRequired = !value.isRequired;

    setValue((prev) => ({
      ...prev,
      isRequired,
    }));

    saveUpdates({ isRequired });
  }, [saveUpdates, setValue, value.isRequired]);

  const handleDependsOnChange = useCallback(
    (dependsOn?: DependsOnProps) => {
      setValue((prev) => ({
        ...prev,
        dependsOn,
      }));
      saveUpdates({ dependsOn });
    },
    [saveUpdates, setValue]
  );

  const handleDelete = useCallback(() => {
    deleteField(id);
  }, [deleteField, id]);

  return {
    handleCheckbox,
    handleDelete,
    handleDependsOnChange,
    handleInputChange,
    handleLimitsChange,
    saveUpdates,
    value,
  };
};

export { useFieldsBase };
