import { Flex, Switch } from "@chakra-ui/react";
import React from "react";

import { useSelect } from "../hooks/useSelect";
import SelectHeader from "./Header";
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

  return (
    <Flex
      direction="column"
      py="12"
      px="8"
      my="4"
      bg="blackAlpha.100"
      borderRadius="10"
      width="80vw"
    >
      <SelectHeader
        handleInputChange={handleInputChange}
        handleDelete={handleDelete}
        value={value}
      />
      <SelectOptions
        handleAddOption={handleAddOption}
        handleOptionChange={handleOptionChange}
        handleDeleteOption={handleDeleteOption}
        toggleOtherOption={toggleOtherOption}
        handleOtherOption={handleOtherOption}
        value={value}
      />
      <Switch mt="5" mr="auto" onChange={handleCheckbox}>
        Campo obrigatório
      </Switch>
    </Flex>
  );
};

export default SelectCreation;
