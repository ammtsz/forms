"use client"

import { Flex } from "@chakra-ui/react";
import React from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useFormCreation } from "@/store/formCreation";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import { useOptions } from "../hooks/useOptions";
import Options from "./Options";

interface SelectProps {
  id: string;
}

const OptionsFieldsCreation: React.FC<SelectProps> = ({ id }) => {
  const {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    handleAddOption,
    handleOptionChange,
    handleDeleteOption,
    toggleOtherOption,
    handleOtherOption,
    value,
  } = useOptions({ id });

  const { errors } = useFormCreation();

  return (
    <Flex
      direction="column"
      pt="8"
      pb="12"
      px="8"
      my="4"
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
      <Options
        handleAddOption={handleAddOption}
        handleOptionChange={handleOptionChange}
        handleDeleteOption={handleDeleteOption}
        toggleOtherOption={toggleOtherOption}
        handleOtherOption={handleOtherOption}
        fieldErrors={errors && errors[id]}
        type={getPrefixFromString(id) as FieldsType}
        value={value}
      />
      <FieldFooter handleCheckbox={handleCheckbox} />
    </Flex>
  );
};

export default OptionsFieldsCreation;
