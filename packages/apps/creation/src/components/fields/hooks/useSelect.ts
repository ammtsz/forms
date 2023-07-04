import React, { useCallback, useState } from "react";

import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

interface SelectProps {
  id: string;
}

// TODO: fix performance - stop calling saveUpdates for all updates
const useSelect = ({ id }: SelectProps) => {
  const [value, setValue] = useState({
    label: "",
    description: "",
    isRequired: false,
    options: [{ label: "", value: "" }],
    optionOther: { isVisible: false, placeholder: "" },
  });

  const { deleteField, updateField } = useFormCreation();

  const saveUpdates = useCallback(
    (props = {}) => {
      // handleClearEmptyFields()
      updateField({
        id,
        type: getPrefixFromString(id),
        label: value.label,
        description: value.description,
        required: value.isRequired,
        options: value.options,
        optionOther: value.optionOther,
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
        [event.target.name]: event.target.value,
      }));
      saveUpdates({ [event.target.name]: event.target.value });
    },
    [saveUpdates]
  );

  const handleCheckbox = useCallback(() => {
    const isRequired = !value.isRequired;

    setValue((prev) => ({
      ...prev,
      isRequired,
    }));

    saveUpdates({ isRequired });
  }, [saveUpdates, value.isRequired]);

  const handleDelete = useCallback(() => {
    deleteField(id);
  }, [deleteField, id]);

  const handleAddOption: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setValue((prev) => ({
        ...prev,
        options: [
          ...prev.options,
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
        const options = [...value.options];
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
        const options = [...value.options];
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
      isVisible: !value.optionOther.isVisible,
    };

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
        };

        setValue((prev) => ({
          ...prev,
          optionOther,
        }));

        saveUpdates({ optionOther });
      },
      [saveUpdates, value.optionOther]
    );

  return {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    saveUpdates,
    handleAddOption,
    handleOptionChange,
    handleDeleteOption,
    toggleOtherOption,
    handleOtherOption,
    value,
  };
};

export { useSelect };
