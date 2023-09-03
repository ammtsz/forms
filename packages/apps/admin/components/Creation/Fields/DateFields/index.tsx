"use client";

import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { getPrefixFromString } from "@forms/utils";

import { useTranslation } from "@app/i18n/client";
import { useFormCreation } from "@app/store/formCreation";
import { FieldComponentProps } from "@app/types";

import FieldBase from "../FieldBase";
import FieldFooter from "../FieldFooter";
import FieldHeader from "../FieldHeader";
import FieldIcon from "../FieldIcon";
import { useDates } from "../hooks/useDates";
import DateLimitPicker from "./DateLimitPicker";

const DateFieldsCreation: React.FC<FieldComponentProps> = ({
  id,
  isDisabled,
  setDraggable,
}) => {
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

  const { t } = useTranslation();

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
          <Text
            color={"blackAlpha.600"}
            fontSize={["sm", "sm", "md"]}
            mb={2}
            mt={8}
          >
            {t("commons.optional")}
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
              isDisabled={isDisabled}
            />
          </Flex>
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

export default DateFieldsCreation;
