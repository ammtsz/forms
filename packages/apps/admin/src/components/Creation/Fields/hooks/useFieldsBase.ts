import React, { useCallback } from "react";

import { MakeOptional } from "@forms/types/global/makeOptional";
import { OptionsFormProps } from "@forms/types/interfaces/field";
import { Fields, getPrefixFromString } from "@forms/utils";

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

// TODO: fix performance - stop calling saveUpdates for all updates
const useFieldsBase = ({ id, value, setValue }: FieldsBaseProps) => {
  const { deleteField, updateField } = useFormCreation();

  const saveUpdates = useCallback(
    (props = {}) => {
      const type = getPrefixFromString(id);

      const optionsFields =
        type === Fields.select
          ? { options: value.options, optionOther: value.optionOther }
          : {};

      // handleClearEmptyFields()

      updateField({
        id,
        type,
        label: value.label,
        description: value.description,
        isRequired: value.isRequired,
        ...optionsFields,
        ...props,
      });
    },
    [
      updateField,
      id,
      value.label,
      value.description,
      value.isRequired,
      value.options,
      value.optionOther,
    ]
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
    handleInputChange,
    handleCheckbox,
    handleDelete,
    saveUpdates,
    value,
  };
};

export { useFieldsBase };
