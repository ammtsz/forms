import { Textarea, Flex, Switch } from "@chakra-ui/react";
import React, { useState } from "react";

import FieldHeader from "../FieldHeader";
import { ValueProps, useFieldsBase } from "../hooks/useFieldsBase";

const TextareaCreation: React.FC<{ id: string }> = ({ id }) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    placeholder: "",
    isRequired: false,
  });

  const { handleInputChange, handleDelete, handleCheckbox } = useFieldsBase({
    id,
    value,
    setValue,
  });

  return (
    <Flex
      direction="column"
      py="12"
      px="8"
      my="10"
      bg="blackAlpha.100"
      borderRadius="10"
      width="100%"
    >
      <FieldHeader
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        value={value}
      />
      <Textarea
        bg="white"
        border="none"
        color="blackAlpha.500"
        mt="3"
        name="placeholder"
        onChange={handleInputChange}
        placeholder="Adicione um placeholder (opcional)"
        _placeholder={{ color: "inherit" }}
        value={value.placeholder}
      />
      <Switch mt="5" mr="auto" onChange={handleCheckbox}>
        Campo obrigatório
      </Switch>
    </Flex>
  );
};

export default TextareaCreation;
