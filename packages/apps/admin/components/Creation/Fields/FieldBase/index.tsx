"use client";

import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

import { FieldProps } from "@forms/types/interfaces/field";

interface FieldBaseProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  fieldErrors: string[] | null;
  value: Partial<FieldProps>;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  handleInputChange,
  fieldErrors,
  value,
}) => {
  const hasLabelError = !!(fieldErrors && fieldErrors.includes("label"));

  return (
    <>
      <FormControl isInvalid={hasLabelError} mb={0}>
        <Input
          color="blackAlpha.900"
          fontSize={["sm", "sm", "md"]}
          mr="3"
          name="label"
          onChange={handleInputChange}
          placeholder="Adicione uma pergunta"
          _placeholder={{ color: "inherit" }}
          value={value.label}
          variant={hasLabelError ? "flushed" : "unstyled"}
        />
        {hasLabelError && (
          <FormErrorMessage fontSize={["xs", "xs", "sm"]} mt={0}>
            Campo obrigatório
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl mt={0}>
        <Input
          color="blackAlpha.600"
          fontSize={["xs", "xs", "sm"]}
          name="description"
          onChange={handleInputChange}
          placeholder="Adicione uma decrição (opcional)"
          _placeholder={{ color: "inherit" }}
          value={value.description}
          variant={"unstyled"}
        />
      </FormControl>
    </>
  );
};

export default FieldBase;
