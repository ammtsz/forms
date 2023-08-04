"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { DateFieldProps } from "@forms/types/interfaces/field";

import useDates from "../hooks/useDates";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const DateField: React.FC<DateFieldProps> = ({
  description,
  id,
  label,
  max,
  min,
  value: initialValue,
}) => {
  const [value, setValue] = useState("");

  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange, limits } = useDates({
    id,
    initialValue,
    max,
    min,
    setValue,
  });

  const hasError = validateField(id);

  return isVisible ? (
    <React.Fragment>
      <FieldHeader description={description} label={label} />
      <FormControl isInvalid={hasError}>
        <Input
          max={limits.max}
          min={limits.min}
          onChange={handleChange}
          type="date"
          value={value}
        />
        {hasError && (
          <FormErrorMessage mt={1}>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
    </React.Fragment>
  ) : null;
};

export default DateField;
