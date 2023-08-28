"use client";

import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { FieldProps } from "@forms/types/interfaces/field";

interface FieldBaseProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  fieldErrors: string[] | null;
  value: Partial<FieldProps>;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  handleInputChange,
  fieldErrors,
  value,
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
      />
    </>
  );
};

export default FieldBase;
