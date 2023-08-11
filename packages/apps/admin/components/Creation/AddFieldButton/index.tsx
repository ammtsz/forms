"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { FieldsType } from "@forms/types/interfaces/field";
import { uuid } from "@forms/utils";

import { FIELDS_LABEL } from "@app/constants/fieldsLabels";
import { useFormCreation } from "@app/store/formCreation";

const AddFieldButton: React.FC = () => {
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
      key={value}
      bg="whiteAlpha.900"
      fontSize={["sm", "sm", "md"]}
      my="1"
      onClick={() => handleNewFieldClick(value)}
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
      {Object.keys(FIELDS_LABEL).map((type) =>
        renderButton(FIELDS_LABEL[type], type as FieldsType)
      )}
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
