"use client";

import { Textarea, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { Fields, getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@/store/formCreation";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import { ValueProps, useFieldsBase } from "../hooks/useFieldsBase";

const TextsFieldsCreation: React.FC<{ id: string }> = ({ id }) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    placeholder: "",
    isRequired: false,
  });

  const { handleInputChange, handleDelete, handleCheckbox } = useFieldsBase({
    id,
    value,
    setValue,
  });

  const { errors } = useFormCreation();

  const type = getPrefixFromString(id) as FieldsType;
  const Text = type === Fields.textarea ? Textarea : Input;

  return (
    <Flex
      direction="column"
      pt="8"
      pb="12"
      px="8"
      my="10"
      bg="blackAlpha.100"
      borderRadius="10"
      width="100%"
    >
      <FieldHeader handleDelete={handleDelete} type={getPrefixFromString(id)} />
      <FieldBase
        handleInputChange={handleInputChange}
        fieldErrors={errors && errors[id]}
        value={value}
      />
      <Text
        bg="white"
        border="none"
        color="blackAlpha.500"
        mt="3"
        name="placeholder"
        onChange={handleInputChange}
        placeholder="Adicione um placeholder (opcional)"
        _placeholder={{ color: "inherit" }}
        value={value.placeholder}
      />
      <FieldFooter handleCheckbox={handleCheckbox} />
    </Flex>
  );
};

export default TextsFieldsCreation;
