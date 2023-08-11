"use client";

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

import { useFormCreation } from "@app/store/formCreation";

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
        <RadioGroup
          size={["sm", "sm", "md"]}
          onChange={(e) => handleOptionsSelect(true, e)}
        >
          <Radio value="true">Sim</Radio>
          <Radio value="false" ml={4}>
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
        size={["sm", "sm", "md"]}
        value={option.value}
        onChange={(e) => handleOptionsSelect(e.target.checked, option.value)}
        colorScheme="telegram"
      >
        {option.label}
      </Checkbox>
    ));
  };

  return visible ? (
    <>
      <Flex>
        <Text
          fontSize={["xs", "xs", "sm"]}
          mt={8}
          mb={2}
          color={"blackAlpha.600"}
        >
          Dependência
        </Text>
      </Flex>
      <Flex
        bg={"whiteAlpha.700"}
        borderRadius={8}
        p={[4, 4, 8]}
        mb={12}
        direction={"column"}
      >
        <FormControl>
          <FormLabel fontSize={["sm", "sm", "md"]}>
            Visível apenas quando:
          </FormLabel>
          <Select
            bg={"white"}
            boxShadow={"inner"}
            fontSize={["sm", "sm", "md"]}
            mb={4}
            name="dependsOnField"
            onChange={handleFieldSelect}
            placeholder="Selecione uma pergunta"
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
        <Button
          onClick={handleCancel}
          m="auto"
          mt={4}
          size={["sm", "sm", "md"]}
        >
          Cancelar
        </Button>
      </Flex>
    </>
  ) : null;
};

export default FieldDependsOn;
