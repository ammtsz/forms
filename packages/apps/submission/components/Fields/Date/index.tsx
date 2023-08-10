"use client";

import { DateFieldProps } from "@forms/types/interfaces/field";

import useDates from "../hooks/useDates";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useFormSubmission } from "@store/formSubmission";
import React from "react";

const DateField: React.FC<DateFieldProps> = ({
  description,
  id,
  isRequired,
  label,
  max,
  min,
  value: initialValue,
}) => {
  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange, limits, value } = useDates({
    id,
    initialValue,
    max,
    min,
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
        <Input
          max={limits.max}
          min={limits.min}
          onChange={handleChange}
          type="date"
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

export default DateField;
