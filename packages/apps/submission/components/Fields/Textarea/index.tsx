"use client";

import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import useTexts from "../hooks/useTexts";
import FieldHeader from "../Reusable/FieldHeader";

const TextareaField: React.FC<BasicFormProps> = ({
  id,
  label,
  placeholder,
  isRequired,
  dependsOn,
  value: initialValue,
  description,
}) => {
  const [value, setValue] = useState("");
  const [isVisible, setVisible] = useState(true);

  const hasError = isRequired && !value;

  useInitFields({
    dependsOn,
    setVisible,
  });

  const { handleChange } = useTexts({
    id,
    initialValue,
    setValue,
  });

  return isVisible ? (
    <React.Fragment>
      <FieldHeader description={description} label={label} />
      <FormControl isInvalid={hasError}>
        <Textarea
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

export default TextareaField;
