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
  fieldId: string;
  initialDependsOn?: DependsOnProps;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
}

const FieldDependsOn: React.FC<FieldDependsOnProps> = ({
  fieldId,
  setVisible,
  handleDependsOn,
  initialDependsOn,
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
    initialDependsOn,
  });

  const { dependsOnOptions } = useFormCreation();

  const renderOptions = () => {
    if (isToggleType()) {
      return (
        <RadioGroup
          size={["sm", "sm", "md"]}
          onChange={(e) => handleOptionsSelect(true, e)}
          value={initialDependsOn?.optionsValues?.[0].toString() || ""}
        >
          <Radio value="true">Sim</Radio>
          <Radio value="false" ml={4}>
            Não
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
        isChecked={initialDependsOn?.optionsValues?.includes(option.value)}
      >
        {option.label}
      </Checkbox>
    ));
  };

  return (
    <>
      <Flex>
        <Text fontSize={["xs", "xs", "sm"]} mb={2} color={"blackAlpha.600"}>
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
            value={selectedField || ""}
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
  );
};

export default FieldDependsOn;
