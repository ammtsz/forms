"use client";

import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import React, { useState } from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import useSingleOptions from "../hooks/useSingleOptions";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const DropdownListField: React.FC<OptionsFormProps> = ({
  dependsOn,
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  placeholder,
  value: initialValue,
}) => {
  const [value, setValue] = useState("");
  const [isVisible, setVisible] = useState(false);

  const hasError = isRequired && !value;

  useInitFields({
    dependsOn,
    setVisible,
  });

  const { handleChange, handleOtherInput } = useSingleOptions({
    id,
    initialValue,
    setValue,
  });

  return isVisible ? (
    <React.Fragment>
      <FieldHeader description={description} label={label} />
      <FormControl isInvalid={hasError}>
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
            {optionOther && <option value="outro: ">outro</option>}
          </React.Fragment>
        </Select>
        {hasError && (
          <FormErrorMessage mt={1}>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
      {value.includes("outro: ") && (
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
