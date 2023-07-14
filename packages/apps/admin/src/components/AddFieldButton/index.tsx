import { Button, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { uuid, Fields } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

const FIELD_BUTTONS = [
  {
    label: "Texto curto",
    value: Fields.text,
  },
  {
    label: "Texto longo",
    value: Fields.textarea,
  },
  {
    label: "Seleção de lista",
    value: Fields.select,
  },
  {
    label: "Radio",
    value: Fields.radio,
  },
  {
    label: "Checkbox",
    value: Fields.checkbox,
  },
  {
    label: "Switch",
    value: Fields.switch,
  },
];

const AddFieldButton = () => {
  const [isSelected, setSelected] = useState<boolean>(false);

  const { addField } = useFormCreation();

  const handleNewFieldClick = useCallback(
    (type: FieldsType) => {
      addField({
        id: `${type}--${uuid()}`,
        label: "",
        type,
      });
      setSelected(false);
    },
    [addField]
  );

  const renderButton = (label: string, value: FieldsType) => (
    <Button
      bg="whiteAlpha.900"
      my="1"
      onClick={() => handleNewFieldClick(value)}
      key={value}
    >
      {label}
    </Button>
  );

  return isSelected ? (
    <Flex
      bg="blackAlpha.100"
      direction={"column"}
      p={8}
      borderRadius={10}
      mt="4"
      mb="16"
    >
      {FIELD_BUTTONS.map(({ label, value }) => renderButton(label, value))}
    </Flex>
  ) : (
    <Button
      bg="blackAlpha.100"
      w={"100%"}
      h={60}
      _hover={{ bg: "blackAlpha.300" }}
      color="white"
      fontSize={"lg"}
      onClick={() => setSelected(true)}
      mt="4"
      mb="16"
    >
      + Adicionar campo
    </Button>
  );
};

export default AddFieldButton;
