"use client";

import { Text } from "@chakra-ui/react";
import React from "react";

interface FieldHeaderProps {
  description?: string;
  hasError?: boolean;
  label: string;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  description,
  hasError,
  label,
}) => {
  return (
    <React.Fragment>
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color={hasError ? "#E53E3E" : "inherit"}
      >
        {label}
      </Text>
      {description && (
        <Text fontSize="sm" mb={2} color="gray">
          {description}
        </Text>
      )}
      {hasError && (
        <Text fontSize="sm" color="#E53E3E" mb={1}>
          Campo obrigatório
        </Text>
      )}
    </React.Fragment>
  );
};

export default FieldHeader;
