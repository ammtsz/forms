"use client";

import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

interface FieldBaseProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  fieldErrors: string[] | null;
  value: Partial<OptionsFormProps>;
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
          mr="3"
          name="label"
          onChange={handleInputChange}
          placeholder="Adicione uma pergunta"
          _placeholder={{ color: "inherit" }}
          value={value.label}
          variant={hasLabelError ? "flushed" : "unstyled"}
        />
        {hasLabelError && (
          <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mt={0}>
        <Input
          name="description"
          variant={"unstyled"}
          color="blackAlpha.600"
          _placeholder={{ color: "inherit" }}
          size="sm"
          placeholder="Adicione uma decrição (opcional)"
          onChange={handleInputChange}
          value={value.description}
        />
        <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default FieldBase;
