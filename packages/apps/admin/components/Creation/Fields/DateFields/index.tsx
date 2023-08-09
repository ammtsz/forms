"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useFormCreation } from "@store/formCreation";
import React from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import FieldIcon from "../FieldIcon";
import { useDates } from "../hooks/useDates";
import DateLimitPicker from "./DateLimitPicker";

const DateFieldsCreation: React.FC<{ id: string }> = ({ id }) => {
  const {
    handleCheckbox,
    handleDelete,
    handleDependsOnChange,
    handleInputChange,
    handleLimitsChange,
    value,
  } = useDates({
    id,
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
      />
      <Flex flexDir={"row"}>
        <FieldIcon type={type} />
        <Flex flexDir={"column"} width={"100%"}>
          <FieldBase
            handleInputChange={handleInputChange}
            fieldErrors={errors && errors[id]}
            value={value}
          />
          <Text
            color={"blackAlpha.600"}
            fontSize={["sm", "sm", "md"]}
            mb={2}
            mt={8}
          >
            Opcional
          </Text>
          <Flex
            justifyContent={"space-around"}
            bg={"whiteAlpha.700"}
            borderRadius={8}
            p={[2, 2, 8]}
          >
            <DateLimitPicker
              max={value.max}
              min={value.min}
              handleInputChange={handleInputChange}
              handleLimitsChange={handleLimitsChange}
            />
          </Flex>
        </Flex>
      </Flex>
      <FieldFooter handleCheckbox={handleCheckbox} />
    </>
  );
};

export default DateFieldsCreation;
