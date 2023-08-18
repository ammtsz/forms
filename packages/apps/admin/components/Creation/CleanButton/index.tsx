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
          <MenuItem onClick={onOpen}>Limpar formulário</MenuItem>
        </MenuList>
      </Menu>

      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleCleanForm}
        onClose={onClose}
        texts={{
          title: "Limpar formulário",
          message:
            "Tem certeza que deseja limpar o formulário? Esta ação não poderá ser desfeita.",
          mainButton: "Limpar",
          isDanger: true,
        }}
      />
    </>
  );
};

export default CleanButton;
