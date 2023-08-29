"use client";

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
import React, { useEffect, useState } from "react";
import { MoreHorizontal as MoreIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import { DependsOnProps, FieldsType } from "@forms/types/interfaces/field";

import { getFieldLabel } from "@app/utils/fieldsLabels";

import FieldDependsOn from "../FieldDependsOn";

interface FieldHeaderProps {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
  fieldId: string;
  type: FieldsType;
  initialDependsOn?: DependsOnProps;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  handleDelete,
  handleDependsOn,
  fieldId,
  type,
  initialDependsOn,
}) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!visible && initialDependsOn?.fieldId) {
      setVisible(true);
    }
  }, [initialDependsOn?.fieldId, visible]);

  return (
    <>
      <Flex alignItems={"center"} mb={4}>
        <Text color="blackAlpha.500" fontSize="sm" as="i">
          {getFieldLabel(type)}
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
          <MenuList fontSize={["sm", "md"]}>
            <MenuItem onClick={() => setVisible(true)}>
              {t("create.labels.dependency")}
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleDelete} color="red.500">
              {t("commons.delete")}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {visible && (
        <FieldDependsOn
          setVisible={setVisible}
          fieldId={fieldId}
          handleDependsOn={handleDependsOn}
          initialDependsOn={initialDependsOn}
        />
      )}
    </>
  );
};

export default FieldHeader;
