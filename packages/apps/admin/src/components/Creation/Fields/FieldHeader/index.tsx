import {
  Input,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { Trash as TrashIcon } from "react-feather";

import { OptionsFormProps } from "@forms/types/interfaces/field";

interface FieldHeaderProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  fieldErrors: string[] | null;
  value: Partial<OptionsFormProps>;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  handleInputChange,
  handleDelete,
  fieldErrors,
  value,
}) => {
  const hasLabelError = !!(fieldErrors && fieldErrors.includes("label"));

  return (
    <>
      <Flex flexDir="row-reverse">
        <Button
          onClick={handleDelete}
          ml="auto"
          py="3"
          color="red.500"
          bg="transparent"
          _hover={{ backgroundColor: "transparent", color: "red.700" }}
        >
          <TrashIcon />
        </Button>
        <FormControl isInvalid={hasLabelError} mb={hasLabelError ? 2 : 0}>
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
      </Flex>
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

export default FieldHeader;
