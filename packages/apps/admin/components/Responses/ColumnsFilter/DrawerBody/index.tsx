"use client";

import {
  DrawerBody as ChakraDrawerBody,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useTableData } from "@app/store/tableData";

interface DrawerBodyProps {
  checkedColumns: { [key: string]: boolean };
  isAllChecked: () => boolean;
  handleToggleAll: () => void;
  handleCheckedColumns: (
    fieldId: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DrawerBody: React.FC<DrawerBodyProps> = ({
  checkedColumns,
  handleToggleAll,
  handleCheckedColumns,
  isAllChecked,
}: DrawerBodyProps) => {
  const { fields } = useTableData();

  const { t } = useTranslation();

  return (
    <ChakraDrawerBody>
      <Flex direction={"column"} py={4} gap={4}>
        <Checkbox
          onChange={handleToggleAll}
          colorScheme="telegram"
          mb={4}
          isChecked={isAllChecked()}
        >
          <Text as={"b"} lineHeight={"125%"}>
            {t("commons.all")}
          </Text>
        </Checkbox>
        {fields.map((field, index) => (
          <Checkbox
            colorScheme="telegram"
            key={field.id}
            data-id={field.id}
            disabled={!index}
            isChecked={!!checkedColumns[field.id]}
            onChange={handleCheckedColumns(field.id)}
          >
            <Text lineHeight={"125%"}>{field.label}</Text>
          </Checkbox>
        ))}
      </Flex>
    </ChakraDrawerBody>
  );
};

export default DrawerBody;
