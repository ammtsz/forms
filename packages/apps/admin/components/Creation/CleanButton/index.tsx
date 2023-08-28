"use client";

import {
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoreHorizontal as MoreHorizontalIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import ConfirmationModal from "@app/components/ConfirmationModal";

interface CleanButtonProps {
  handleCleanForm: () => void;
  isDisabled?: boolean;
}

const CleanButton: React.FC<CleanButtonProps> = ({
  handleCleanForm,
  isDisabled,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { t } = useTranslation();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          bg="white"
          ml="auto"
          h="44px"
          isDisabled={isDisabled}
          _hover={{ bg: "blackAlpha.100" }}
        >
          <MoreHorizontalIcon size={20} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>{t("create.buttons.cleanForm")}</MenuItem>
        </MenuList>
      </Menu>

      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleCleanForm}
        onClose={onClose}
        texts={{
          title: t("create.buttons.cleanForm"),
          message: `${t("confirmations.cleanForm")} ${t(
            "confirmations.cantBeUndone"
          )}`,
          mainButton: t("commons.clean"),
          isDanger: true,
        }}
      />
    </>
  );
};

export default CleanButton;
