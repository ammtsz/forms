"use client";

import { useFormCreation } from "@/store/formCreation";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import FieldIcon from "../FieldIcon";
import { ValueProps, useFieldsBase } from "../hooks/useFieldsBase";

const ToggleFieldsCreation: React.FC<{ id: string }> = ({ id }) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    isRequired: false,
  });

  const { handleInputChange, handleDelete, handleCheckbox } = useFieldsBase({
    id,
    value,
    setValue,
  });

  const { errors } = useFormCreation();

  const type = getPrefixFromString(id) as FieldsType;

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
      <Flex flexDir={"row"}>
        <FieldIcon type={type} />
        <Flex flexDir={"column"} width={"100%"}>
          <FieldBase
            handleInputChange={handleInputChange}
            fieldErrors={errors && errors[id]}
            value={value}
          />
        </Flex>
      </Flex>
      <FieldFooter handleCheckbox={handleCheckbox} />
    </Flex>
  );
};

export default ToggleFieldsCreation;
