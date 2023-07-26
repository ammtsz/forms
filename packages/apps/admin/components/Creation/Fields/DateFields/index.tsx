"use client";

import { useFormCreation } from "@/store/formCreation";
import { Flex, Text } from "@chakra-ui/react";
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
    handleInputChange,
    handleDelete,
    handleCheckbox,
    handleLimitsChange,
    value,
  } = useDates({
    id,
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
          <Text mt={8} mb={2} color={"blackAlpha.600"}>
            Opcional
          </Text>
          <Flex
            justifyContent={"space-around"}
            bg={"whiteAlpha.700"}
            borderRadius={8}
            p={8}
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
    </Flex>
  );
};

export default DateFieldsCreation;
