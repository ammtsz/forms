import React, { useCallback, useState } from "react";

import { OptionProps, OptionOtherProps } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFieldsBase, ValueProps } from "./useFieldsBase";

interface SelectProps {
  id: string;
}

const useOptions = ({ id }: SelectProps) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    isRequired: false,
    options: [{ label: "", value: "" }],
    optionOther: { isVisible: false, placeholder: "" },
  });

  const { handleInputChange, handleDelete, handleCheckbox, saveUpdates } =
    useFieldsBase({
      id,
      value,
      setValue,
    });

  const handleAddOption: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setValue((prev) => ({
        ...prev,
        options: [
          ...(prev.options as OptionProps[]),
          {
            label: "",
            value: "",
          },
        ],
      }));
      saveUpdates();
    }, [saveUpdates]);

  const handleOptionChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const options = [...(value.options as OptionProps[])];
        const index = Number(getPrefixFromString(event.target.name));
        options[index] = {
          label: event.target.value,
          value: event.target.value,
        };
        setValue((prev) => ({
          ...prev,
          options,
        }));
        saveUpdates({ options });
      },
      [saveUpdates, value.options]
    );

  const handleDeleteOption: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (event) => {
        const index = Number(event.currentTarget.getAttribute("data-index"));
        const options = [...(value.options as OptionProps[])];
        options.splice(index, 1);
        setValue((prev) => ({
          ...prev,
          options,
        }));
        saveUpdates({ options });
      },
      [saveUpdates, value.options]
    );

  const toggleOtherOption = useCallback(() => {
    const optionOther = {
      ...value.optionOther,
      isVisible: !(value.optionOther as OptionOtherProps).isVisible,
    } as OptionOtherProps;

    setValue((prev) => ({
      ...prev,
      optionOther,
    }));

    saveUpdates({ optionOther });
  }, [saveUpdates, value.optionOther]);

  const handleOtherOption: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const optionOther = {
          ...value.optionOther,
          placeholder: event.target.value,
        } as OptionOtherProps;

        setValue((prev) => ({
          ...prev,
          optionOther,
        }));

        saveUpdates({ optionOther });
      },
      [saveUpdates, value.optionOther]
    );

  return {
    handleAddOption,
    handleCheckbox,
    handleDelete,
    handleDeleteOption,
    handleInputChange,
    handleOptionChange,
    handleOtherOption,
    toggleOtherOption,
    value,
  };
};

export { useOptions };
