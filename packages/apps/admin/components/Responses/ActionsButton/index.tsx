"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { StatusTypes } from "@app/constants/status";
import { useCheckedRows } from "@app/store/checkedRows";
import { useTableData } from "@app/store/tableData";
import { UpdateStatusProps } from "@app/store/tableData/types";

import ConfirmationModal, { ConfirmationTexts } from "../../ConfirmationModal";
import { ACTIONS, getConfirmationTexts } from "./utils";

const ActionsButton: React.FC = () => {
  const [texts, setAction] = useState<ConfirmationTexts>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { checkedRows } = useCheckedRows();

  const { updateResponseStatus } = useTableData();

  const handleAction: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const action = event.currentTarget.getAttribute("data-action");

      const confirmationTexts = getConfirmationTexts(checkedRows.length);

      setAction(confirmationTexts[action as StatusTypes]);
      onOpen();
    },
    [checkedRows.length, onOpen]
  );

  return (
    <>
      <Menu>
        <MenuButton
          as="button"
          disabled={!checkedRows.length}
          className="primary_btn w-28 "
        >
          Ações ⏷
        </MenuButton>
        <MenuList>
          {ACTIONS.map(({ action, label }) => (
            <MenuItem
              key={action}
              data-action={action}
              onClick={handleAction}
              fontSize={["sm", "sm", "md"]}
              isDisabled={!checkedRows.length}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        texts={texts as ConfirmationTexts}
        onConfirm={updateResponseStatus as (args?: UpdateStatusProps) => void}
      />
    </>
  );
};

export default ActionsButton;
