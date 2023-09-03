"use client";

import {
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MoreHorizontal as MoreHorizontalIcon,
  Trash as TrashIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "react-feather";

import ConfirmationModal from "@app/components/ConfirmationModal";
import { useTranslation } from "@app/i18n/client";
import { useOpenaiRequest } from "@app/store/openaiRequests";

interface FormMenuProps {
  handleCleanForm?: () => void;
  onAIOpen: () => void;
  onAIClose: () => void;
  isAIOpen: boolean;
  isDisabled?: boolean;
}

const FormMenu: React.FC<FormMenuProps> = ({
  handleCleanForm,
  onAIOpen,
  onAIClose,
  isAIOpen,
  isDisabled,
}) => {
  const { setVisible } = useOpenaiRequest();

  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();

  const { t } = useTranslation();

  const handleEnableAI = () => {
    setVisible(true);
    onAIOpen();
  };

  const handleDisableAI = () => {
    setVisible(false);
    onAIClose();
  };

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
          {isAIOpen ? (
            <MenuItem onClick={handleDisableAI} gap={2}>
              <EyeOffIcon size={16} />
              {`${t("commons.disable")} ${t("commons.ai")}`}
            </MenuItem>
          ) : (
            <MenuItem onClick={handleEnableAI} gap={2}>
              <EyeIcon size={16} />
              {`${t("commons.enable")} ${t("commons.ai")}`}
            </MenuItem>
          )}
          {handleCleanForm && (
            <MenuItem onClick={onModalOpen} gap={2}>
              <TrashIcon size={16} /> {t("create.buttons.cleanForm")}
            </MenuItem>
          )}
        </MenuList>
      </Menu>

      {handleCleanForm && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleCleanForm}
          onClose={onModalClose}
          texts={{
            title: t("create.buttons.cleanForm"),
            message: `${t("confirmations.cleanForm")} ${t(
              "confirmations.cantBeUndone"
            )}`,
            mainButton: t("commons.clean"),
            isDanger: true,
          }}
        />
      )}
    </>
  );
};

export default FormMenu;
