"use client";

import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { DateFieldProps } from "@forms/types/interfaces/field";

import { useFormSubmission } from "@app/store/formSubmission";

import useDates from "../hooks/useDates";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

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

  const { t } = useTranslation();

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
          <FormErrorMessage mt={1}>
            {t("commons.requiredField")}
          </FormErrorMessage>
        )}
      </FormControl>
    </React.Fragment>
  ) : null;
};

export default DateField;
