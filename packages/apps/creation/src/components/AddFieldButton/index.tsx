import { Button, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { uuid } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

const FIELD_BUTTONS = [
  {
    label: "Texto curto",
    value: "text",
  },
  {
    label: "Texto longo",
    value: "textarea",
  },
  {
    label: "Seleção de lista",
    value: "select",
  },
  {
    label: "Radio",
    value: "radio",
  },
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "Switch",
    value: "switch",
  },
];

const AddFieldButton = () => {
  const [isSelected, setSelected] = useState<boolean>(false);

  const { addField } = useFormCreation();

  const handleNewFieldClick = useCallback(
    (type: string) => {
      addField({
        id: `${type}--${uuid()}`,
        label: "",
        type,
      });
      setSelected(false);
    },
    [addField]
  );

  const renderButton = (label: string, value: string) => (
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
