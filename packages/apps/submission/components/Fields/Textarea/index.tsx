"use client";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useTexts from "../hooks/useTexts";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { useFormSubmission } from "@store/formSubmission";
import React from "react";

const TextareaField: React.FC<BasicFieldProps> = ({
  id,
  isRequired,
  label,
  placeholder,
  value: initialValue,
  description,
}) => {
  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange, value } = useTexts({
    id,
    initialValue,
  });

  const hasError = validateField(id);

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        isRequired={isRequired}
        label={label}
      />
      <FormControl isInvalid={hasError}>
        <Textarea
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
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
