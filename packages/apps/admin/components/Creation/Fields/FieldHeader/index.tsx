"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MoreHorizontal as MoreIcon } from "react-feather";

import { DependsOnProps, FieldsType } from "@forms/types/interfaces/field";

import { useTranslation } from "@app/i18n/client";

import FieldDependsOn from "../FieldDependsOn1";
import DraggableArea from "./DraggableArea";

interface FieldHeaderProps {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
  setDraggable?: (isDraggable: boolean) => void;
  fieldId: string;
  type: FieldsType;
  initialDependsOn?: DependsOnProps;
  isDisabled?: boolean;
}

const FieldHeader: React.FC<FieldHeaderProps> = ({
  handleDelete,
  handleDependsOn,
  setDraggable,
  fieldId,
  type,
  initialDependsOn,
  isDisabled = false,
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
      <div className="flex items-center mb-4 relative">
        <DraggableArea
          setDraggable={setDraggable}
          type={type}
          isEditable={!isDisabled}
        />
        <Menu>
          <MenuButton
            as={Button}
            color="black"
            bg="transparent"
            h="40px"
            w="40px"
            p="10px"
            isDisabled={isDisabled}
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
      </div>
      {visible && (
        <FieldDependsOn
          setVisible={setVisible}
          fieldId={fieldId}
          handleDependsOn={handleDependsOn}
          initialDependsOn={initialDependsOn}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
};

export default FieldHeader;
