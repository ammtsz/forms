"use client";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFieldProps } from "@forms/types/interfaces/field";

import useSingleOptions from "../hooks/useSingleOptions";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";
import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { useFormSubmission } from "@store/formSubmission";
import React from "react";

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

  const { handleChange, handleOtherInput, other, value } = useSingleOptions({
    id,
    initialValue,
  });

  const hasError = validateField(id);

  const isOtherOption = value === "other";

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        isRequired={isRequired}
        label={label}
      />
      <FormControl isInvalid={hasError} mb={isOtherOption ? 2 : 0}>
        <Select
          placeholder={placeholder || "--- Selecione ---"}
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
            {optionOther.isVisible && <option value="other">outro</option>}
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
          value={other}
        />
      )}
    </React.Fragment>
  ) : null;
};

export default DropdownListField;
