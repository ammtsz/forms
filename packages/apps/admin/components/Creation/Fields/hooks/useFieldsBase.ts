"use client";

import React, { useCallback, useEffect } from "react";

import { MakeOptional } from "@forms/types/global/makeOptional";
import { DependsOnProps, FieldProps } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

export type ValueProps = MakeOptional<FieldProps, "id" | "type">;

// TODO: remove any
interface FieldsBaseProps {
  id: string;
  value: ValueProps;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const useFieldsBase = ({ id, value, setValue }: FieldsBaseProps) => {
  const { deleteField, updateField, fields } = useFormCreation();

  const saveUpdates = useCallback(
    (props = {}) => {
      const type = getPrefixFromString(id);

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

  useEffect(() => {
    const initialValue = fields.find((field) => field.id === id);

    if (!value.label && initialValue && initialValue.label) {
      setValue(initialValue);
    }
  }, [fields, id, setValue, value]);

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
