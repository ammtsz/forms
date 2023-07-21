import React, { useCallback } from "react";

import { MakeOptional } from "@forms/types/global/makeOptional";
import { OptionsFormProps } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

export type ValueProps = MakeOptional<
  OptionsFormProps,
  "id" | "type" | "options" | "optionOther"
>;

interface FieldsBaseProps {
  id: string;
  value: ValueProps;
  setValue: React.Dispatch<React.SetStateAction<ValueProps>>;
}

const useFieldsBase = ({ id, value, setValue }: FieldsBaseProps) => {
  const { deleteField, updateField } = useFormCreation();

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

  const handleDelete = useCallback(() => {
    deleteField(id);
  }, [deleteField, id]);

  return {
    handleCheckbox,
    handleDelete,
    handleInputChange,
    handleLimitsChange,
    saveUpdates,
    value,
  };
};

export { useFieldsBase };
