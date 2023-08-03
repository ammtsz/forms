"use client";

import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { DateFieldProps } from "@forms/types/interfaces/field";

import useDates from "../hooks/useDates";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const DateField: React.FC<DateFieldProps> = ({
  dependsOn,
  description,
  id,
  isRequired,
  label,
  max,
  min,
  value: initialValue,
}) => {
  const [value, setValue] = useState("");

  const hasError = isRequired && !value;

  const { isVisible } = useVisibleField({ dependsOn });

  const { handleChange, limits } = useDates({
    id,
    initialValue,
    max,
    min,
    setValue,
  });

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
