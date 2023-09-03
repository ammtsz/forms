"use client";

import { Textarea, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { Fields, getPrefixFromString } from "@forms/utils";

import { useTranslation } from "@app/i18n/client";
import { useFormCreation } from "@app/store/formCreation";
import { FieldComponentProps } from "@app/types";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import { ValueProps, useFieldsBase } from "../hooks/useFieldsBase";

const TextsFieldsCreation: React.FC<FieldComponentProps> = ({
  id,
  isDisabled,
  setDraggable,
}) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    placeholder: "",
    isRequired: false,
  });

  const {
    handleCheckbox,
    handleDelete,
    handleDependsOnChange,
    handleInputChange,
  } = useFieldsBase({
    id,
    value,
    setValue,
  });

  const { t } = useTranslation();

  const { errors } = useFormCreation();

  const type = getPrefixFromString(id) as FieldsType;
  const Text = type === Fields.textarea ? Textarea : Input;

  return (
    <>
      <FieldHeader
        handleDelete={handleDelete}
        type={getPrefixFromString(id)}
        fieldId={id}
        handleDependsOn={handleDependsOnChange}
        initialDependsOn={value.dependsOn}
        isDisabled={isDisabled}
        setDraggable={setDraggable}
      />
      <FieldBase
        handleInputChange={handleInputChange}
        fieldErrors={errors && errors[id]}
        value={value}
        isDisabled={isDisabled}
      />
      <Text
        bg="white"
        border="none"
        color="blackAlpha.500"
        fontSize={["sm", "sm", "md"]}
        mt="3"
        name="placeholder"
        onChange={handleInputChange}
        placeholder={t("create.placeholders.addPlaceholder")}
        _placeholder={{ color: "inherit" }}
        value={value.placeholder || ""}
        isDisabled={isDisabled}
      />
      <FieldFooter
        handleCheckbox={handleCheckbox}
        isRequired={value.isRequired}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default TextsFieldsCreation;
