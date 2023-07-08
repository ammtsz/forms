import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEventHandler, useCallback, useState } from "react";
import { ChevronDown as ChevronDownIcon } from "react-feather";

import { StatusTypes } from "@app/constants/status";
import { useCheckedRows } from "@app/store/checkedRows";
import { useTableData } from "@app/store/tableData";

import ConfirmationModal, { ConfirmationTexts } from "../ConfirmationModal";
import { ACTIONS, getConfirmationTexts } from "./utils";

const ActionsButton = () => {
  const [texts, setAction] = useState<ConfirmationTexts>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { checkedRows } = useCheckedRows();

  const { updateResponseStatus } = useTableData();

  const handleAction: MouseEventHandler<HTMLButtonElement> = useCallback(
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
          as={Button}
          bg="cyan.800"
          color="white"
          isDisabled={!checkedRows.length}
          rightIcon={<ChevronDownIcon size={"1rem"} />}
          _hover={{ bg: "cyan.900" }}
        >
          Ações
        </MenuButton>
        <MenuList>
          {ACTIONS.map(({ action, label }) => (
            <MenuItem
              key={action}
              data-action={action}
              onClick={handleAction}
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
        onConfirm={updateResponseStatus}
      />
    </>
  );
};

export default ActionsButton;
