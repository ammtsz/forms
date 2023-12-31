"use client";

import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";
import { FieldComponentProps } from "@app/types";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import FieldIcon from "../FieldIcon";
import { ValueProps, useFieldsBase } from "../hooks/useFieldsBase";

const ToggleFieldsCreation: React.FC<FieldComponentProps> = ({
  id,
  isDisabled,
  setDraggable,
}) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
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

  const { errors } = useFormCreation();

  const type = getPrefixFromString(id) as FieldsType;

  return (
    <>
      <FieldHeader
        fieldId={id}
        handleDelete={handleDelete}
        handleDependsOn={handleDependsOnChange}
        type={getPrefixFromString(id)}
        initialDependsOn={value.dependsOn}
        isDisabled={isDisabled}
        setDraggable={setDraggable}
      />
      <Flex flexDir={"row"}>
        <FieldIcon type={type} />
        <Flex flexDir={"column"} width={"100%"}>
          <FieldBase
            handleInputChange={handleInputChange}
            fieldErrors={errors && errors[id]}
            value={value}
            isDisabled={isDisabled}
          />
        </Flex>
      </Flex>
      <FieldFooter
        handleCheckbox={handleCheckbox}
        isRequired={value.isRequired}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default ToggleFieldsCreation;
