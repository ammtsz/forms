"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import React from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFieldProps } from "@forms/types/interfaces/field";

import useSingleOptions from "../hooks/useSingleOptions";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const DropdownListField: React.FC<
  MakeRequired<OptionsFieldProps, "options" | "optionOther">
> = ({
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  placeholder,
  value: initialValue,
}) => {
  const { validateField } = useFormSubmission();

  const { isVisible } = useVisibleField({ id });

  const { handleChange, handleOtherInput, value } = useSingleOptions({
    id,
    initialValue,
  });

  const hasError = validateField(id);

  const isOtherOption = value.includes("outro: ");

  const selectPlaceholder = isOtherOption
    ? "outro"
    : placeholder || "--- Selecione ---";

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        isRequired={isRequired}
        label={label}
      />
      <FormControl isInvalid={hasError} mb={isOtherOption ? 2 : 0}>
        <Select
          placeholder={selectPlaceholder}
          onChange={handleChange}
          value={value}
          bg="white"
          boxShadow="inner"
        >
          <React.Fragment>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {optionOther && <option value="outro: ">outro</option>}
          </React.Fragment>
        </Select>
        {hasError && (
          <FormErrorMessage mt={1}>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
      {isOtherOption && (
        <OtherOption
          placeholder={optionOther.placeholder}
          handleOtherInput={handleOtherInput}
          value={value}
        />
      )}
    </React.Fragment>
  ) : null;
};

export default DropdownListField;
