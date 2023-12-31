"use client";

import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

import { FieldProps } from "@forms/types/interfaces/field";

import { useTranslation } from "@app/i18n/client";

interface FieldBaseProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  fieldErrors: string[] | null;
  value: Partial<FieldProps>;
  isDisabled?: boolean;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  handleInputChange,
  fieldErrors,
  value,
  isDisabled = false,
}) => {
  const hasLabelError = !!(fieldErrors && fieldErrors.includes("label"));

  const { t } = useTranslation();

  return (
    <>
      <FormControl isInvalid={hasLabelError} mb={0}>
        <Input
          color="blackAlpha.900"
          fontSize={["sm", "sm", "md"]}
          mr="3"
          name="label"
          onChange={handleInputChange}
          placeholder={t("create.placeholders.addQuestion")}
          _placeholder={{ color: "inherit" }}
          value={value.label}
          variant={hasLabelError ? "flushed" : "unstyled"}
          isDisabled={isDisabled}
        />
        {hasLabelError && (
          <FormErrorMessage fontSize={["xs", "xs", "sm"]} mt={0}>
            {t("commons.requiredField")}
          </FormErrorMessage>
        )}
      </FormControl>
      <Input
        color="blackAlpha.600"
        fontSize={["xs", "xs", "sm"]}
        name="description"
        onChange={handleInputChange}
        placeholder={t("create.placeholders.addDescription")}
        _placeholder={{ color: "inherit" }}
        value={value.description || ""}
        variant={"unstyled"}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default FieldBase;
