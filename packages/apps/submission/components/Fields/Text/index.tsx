"use client";

import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useTexts from "../hooks/useTexts";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const Text: React.FC<BasicFieldProps> = ({
  id,
  label,
  placeholder,
  isRequired,
  dependsOn,
  value: initialValue,
  description,
}) => {
  const [value, setValue] = useState("");

  const hasError = isRequired && !value;

  const { isVisible } = useVisibleField({ dependsOn });

  const { handleChange } = useTexts({
    id,
    initialValue,
    setValue,
  });

  return isVisible ? (
    <React.Fragment>
      <FieldHeader description={description} label={label} />
      <FormControl isInvalid={hasError}>
        <Input
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          bg="white"
          boxShadow="inner"
        />
        {hasError && (
          <FormErrorMessage mt={1}>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
    </React.Fragment>
  ) : null;
};

export default Text;
