import { Textarea, Input, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { Trash as TrashIcon } from "react-feather";

import { OptionsFormProps } from "@forms/types/interfaces/field";

interface FieldHeaderProps {
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  value: Partial<OptionsFormProps>;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  handleInputChange,
  handleDelete,
  value,
}) => {
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
        <Input
          name="label"
          variant="unstyled"
          color="blackAlpha.900"
          _placeholder={{ color: "inherit" }}
          placeholder="Adicione uma pergunta"
          mr="3"
          onChange={handleInputChange}
          value={value.label}
        />
      </Flex>
      <Textarea
        name="description"
        variant="unstyled"
        color="blackAlpha.600"
        _placeholder={{ color: "inherit" }}
        size="sm"
        placeholder="Adicione uma decrição"
        onChange={handleInputChange}
        value={value.description}
      />
    </>
  );
};

export default FieldHeader;
