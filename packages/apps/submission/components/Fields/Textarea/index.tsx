"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useTexts from "../hooks/useTexts";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const TextareaField: React.FC<BasicFieldProps> = ({
  id,
  label,
  placeholder,
  value: initialValue,
  description,
}) => {
  const [value, setValue] = useState("");

  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange } = useTexts({
    id,
    initialValue,
    setValue,
  });

  const hasError = validateField(id);

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
