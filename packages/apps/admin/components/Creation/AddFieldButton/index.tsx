"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { FieldsType } from "@forms/types/interfaces/field";
import { uuid } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";
import { getFieldLabel, getFields } from "@app/utils/fieldsLabels";

const AddFieldButton: React.FC = () => {
  const [isSelected, setSelected] = useState<boolean>(false);

  const { addField } = useFormCreation();

  const { t } = useTranslation();

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
      {getFields().map((type) => renderButton(getFieldLabel(type), type))}
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
      {t("create.buttons.addField")}
    </Button>
  );
};

export default AddFieldButton;
