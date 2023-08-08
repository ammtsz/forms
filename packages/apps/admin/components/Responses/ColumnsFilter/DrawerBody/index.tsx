"use client";

import { useTableData } from "@/store/tableData";
import {
  DrawerBody as ChakraDrawerBody,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";

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

  return (
    <ChakraDrawerBody>
      <Flex direction={"column"} py={4} gap={4}>
        <Checkbox
          onChange={handleToggleAll}
          colorScheme="blackAlpha"
          mb={4}
          isChecked={isAllChecked()}
        >
          <Text as={"b"} lineHeight={"125%"}>
            Todas
          </Text>
        </Checkbox>
        {fields.map((field, index) => (
          <Checkbox
            colorScheme="cyan"
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