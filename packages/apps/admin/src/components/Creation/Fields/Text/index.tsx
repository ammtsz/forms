import { Input, Flex, Switch } from "@chakra-ui/react";
import React, { useState } from "react";

import { useFormCreation } from "@app/store/formCreation";

import FieldHeader from "../FieldHeader";
import { useFieldsBase, ValueProps } from "../hooks/useFieldsBase";

const TextCreation: React.FC<{ id: string }> = ({ id }) => {
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

  const { errors } = useFormCreation();

  return (
    <Flex
      bg="blackAlpha.100"
      borderRadius="10"
      direction="column"
      my="4"
      px="8"
      py="12"
      width="100%"
    >
      <FieldHeader
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        fieldErrors={errors && errors[id]}
        value={value}
      />
      <Input
        bg="white"
        border="none"
        color="blackAlpha.500"
        mt="8"
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

export default TextCreation;
