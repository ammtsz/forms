"use client";

import { FIELDS_LABEL } from "@/constants/fieldsLabels";
import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Trash as TrashIcon } from "react-feather";

import { FieldsType } from "@forms/types/interfaces/field";

interface FieldHeaderProps {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  type: FieldsType;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({ handleDelete, type }) => {
  return (
    <Flex alignItems={"center"} mb={4}>
      <Text color="blackAlpha.500" fontSize="sm" as="i">
        {FIELDS_LABEL[type]}
      </Text>
      <Button
        bg="transparent"
        color="red.500"
        ml="auto"
        onClick={handleDelete}
        py="3"
        _hover={{ backgroundColor: "transparent", color: "red.700" }}
      >
        <TrashIcon />
      </Button>
    </Flex>
  );
};

export default FieldHeader;
