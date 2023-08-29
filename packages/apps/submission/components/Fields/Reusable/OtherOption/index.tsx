"use client";

import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface OtherOptionProps {
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
  isMultiSelect?: boolean;
  placeholder?: string;
  value: string;
}

const OtherOption: React.FC<OtherOptionProps> = ({
  handleOtherInput,
  isMultiSelect = false,
  placeholder,
  value,
}) => {
  const { t } = useTranslation();

  const label = `${t(isMultiSelect ? "fields.others" : "fields.other")}: `;

  return (
    <FormControl
      as={Flex}
      alignItems="baseline"
      fontWeight="normal"
      ml={1}
      mt={2}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        bg="white"
        variant="flushed"
        onChange={handleOtherInput}
        placeholder={placeholder}
        value={value}
      />
    </FormControl>
  );
};

export default OtherOption;
