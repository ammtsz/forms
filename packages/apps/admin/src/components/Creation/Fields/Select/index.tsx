import { Flex, Switch } from "@chakra-ui/react";
import React from "react";

import { useFormCreation } from "@app/store/formCreation";

import SelectHeader from "../FieldHeader";
import { useSelect } from "../hooks/useSelect";
import SelectOptions from "./Options";

interface SelectProps {
  id: string;
}

const SelectCreation: React.FC<SelectProps> = ({ id }) => {
  const {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    handleAddOption,
    handleOptionChange,
    handleDeleteOption,
    toggleOtherOption,
    handleOtherOption,
    value,
  } = useSelect({ id });

  const { errors } = useFormCreation();

  return (
    <Flex
      direction="column"
      py="12"
      px="8"
      my="4"
      bg="blackAlpha.100"
      borderRadius="10"
      width="100%"
    >
      <SelectHeader
        handleInputChange={handleInputChange}
        handleDelete={handleDelete}
        fieldErrors={errors && errors[id]}
        value={value}
      />
      <SelectOptions
        handleAddOption={handleAddOption}
        handleOptionChange={handleOptionChange}
        handleDeleteOption={handleDeleteOption}
        toggleOtherOption={toggleOtherOption}
        handleOtherOption={handleOtherOption}
        fieldErrors={errors && errors[id]}
        value={value}
      />
      <Switch mt="5" mr="auto" onChange={handleCheckbox}>
        Campo obrigatório
      </Switch>
    </Flex>
  );
};

export default SelectCreation;
