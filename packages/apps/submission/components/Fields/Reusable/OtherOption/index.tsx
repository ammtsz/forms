"use client";

import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

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
  const other = isMultiSelect ? "outros: " : "outro: ";

  return (
    <FormControl
      as={Flex}
      alignItems="baseline"
      fontWeight="normal"
      ml={1}
      mt={2}
    >
      <FormLabel>Outro: </FormLabel>
      <Input
        bg="white"
        variant="flushed"
        onChange={handleOtherInput}
        placeholder={placeholder}
        value={value.replace(other, "")}
      />
    </FormControl>
  );
};

export default OtherOption;