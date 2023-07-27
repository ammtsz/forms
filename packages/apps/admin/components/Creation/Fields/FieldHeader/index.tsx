"use client";

import { FIELDS_LABEL } from "@/constants/fieldsLabels";
import {
  Flex,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MoreHorizontal as MoreIcon } from "react-feather";

import { DependsOnProps, FieldsType } from "@forms/types/interfaces/field";

import FieldDependsOn from "../FIeldDependsOn";

interface FieldHeaderProps {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
  fieldId: string;
  type: FieldsType;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  handleDelete,
  handleDependsOn,
  fieldId,
  type,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Flex alignItems={"center"} mb={4}>
        <Text color="blackAlpha.500" fontSize="sm" as="i">
          {FIELDS_LABEL[type]}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            color="black"
            bg="transparent"
            h="40px"
            w="40px"
            p="10px"
            ml="auto"
          >
            <MoreIcon size="20px" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setVisible(true)}>Dependência</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleDelete} color="red.500">
              Apagar
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <FieldDependsOn
        visible={visible}
        setVisible={setVisible}
        fieldId={fieldId}
        handleDependsOn={handleDependsOn}
      />
    </>
  );
};

export default FieldHeader;
