"use client";

import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import React from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import { useTranslation } from "@app/i18n/client";
import { useFormSubmission } from "@app/store/formSubmission";

import useTexts from "../hooks/useTexts";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

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
        <Textarea
          placeholder={placeholder}
          onChange={handleChange}
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

export default TextareaField;
