"use client";

import { Text } from "@chakra-ui/react";
import React from "react";

interface FieldHeaderProps {
  description?: string;
  hasError?: boolean;
  isRequired?: boolean;
  isToggle?: boolean;
  label: string;
  mt?: number;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  description,
  hasError,
  isRequired,
  isToggle,
  label,
  mt,
}) => {
  return (
    <React.Fragment>
      <Text
        fontSize="lg"
        fontWeight={isToggle ? "normal" : "semibold"}
        color={hasError ? "#E53E3E" : "inherit"}
        mb={description || hasError ? 0 : 2}
        mt={mt ?? 16}
      >
        {`${label} ${isRequired ? "*" : ""}`}
      </Text>
      {hasError && (
        <Text
          fontSize="sm"
          color="#E53E3E"
          mb={description ? 0 : 2}
          fontWeight="normal"
        >
          Campo obrigatório
        </Text>
      )}
      {!!description && (
        <Text fontSize="sm" mb={2} color="gray" fontWeight="normal">
          {description}
        </Text>
      )}
    </React.Fragment>
  );
};

export default FieldHeader;
