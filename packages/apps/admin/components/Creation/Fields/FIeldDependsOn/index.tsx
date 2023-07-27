"use client";

import { useFormCreation } from "@/store/formCreation";
import {
  Select,
  FormControl,
  FormLabel,
  Text,
  Button,
  Flex,
  Checkbox,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { DependsOnProps, OptionProps } from "@forms/types/interfaces/field";

import useFieldDependsOn from "./hooks/useFieldsDependsOn";

interface FieldDependsOnProps {
  visible: boolean;
  fieldId: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
}

const FieldDependsOn: React.FC<FieldDependsOnProps> = ({
  visible,
  fieldId,
  setVisible,
  handleDependsOn,
}) => {
  const {
    handleCancel,
    handleFieldSelect,
    handleOptionsSelect,
    isToggleType,
    selectedField,
  } = useFieldDependsOn({
    setVisible,
    handleDependsOn,
  });

  const { dependsOnOptions } = useFormCreation();

  const renderOptions = () => {
    if (isToggleType()) {
      return (
        <RadioGroup onChange={(e) => handleOptionsSelect(true, e)}>
          <Radio value="yes">Sim</Radio>
          <Radio value="no" ml={4}>
            No
          </Radio>
        </RadioGroup>
      );
    }

    const options =
      dependsOnOptions &&
      (dependsOnOptions[selectedField].options as OptionProps[]);

    return options?.map((option) => (
      <Checkbox
        key={option.value}
        value={option.value}
        onChange={(e) => handleOptionsSelect(e.target.checked, option.value)}
      >
        {option.label}
      </Checkbox>
    ));
  };

  return visible ? (
    <>
      <Flex>
        <Text mt={8} mb={2} color={"blackAlpha.600"}>
          Dependência
        </Text>
      </Flex>
      <Flex
        bg={"whiteAlpha.700"}
        borderRadius={8}
        p={8}
        mb={12}
        direction={"column"}
      >
        <FormControl>
          <FormLabel>Visível apenas quando:</FormLabel>
          <Select
            name="dependsOnField"
            placeholder="Selecione uma pergunta"
            onChange={handleFieldSelect}
            bg={"white"}
            boxShadow={"inner"}
            mb={4}
          >
            {dependsOnOptions &&
              Object.keys(dependsOnOptions).map((id) => {
                if (id !== fieldId) {
                  return (
                    <option key={id} value={id}>
                      {dependsOnOptions[id].label}
                    </option>
                  );
                }

                return null;
              })}
            ;
          </Select>
        </FormControl>
        {selectedField && <Flex direction={"column"}>{renderOptions()}</Flex>}
        <Button onClick={handleCancel} m="auto">
          Cancelar
        </Button>
      </Flex>
    </>
  ) : null;
};

export default FieldDependsOn;
