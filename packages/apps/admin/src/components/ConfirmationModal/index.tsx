import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { StatusTypes } from "@app/constants/status";
import { useCheckedRows } from "@app/store/checkedRows";

export interface ConfirmationTexts {
  action: StatusTypes;
  title: string;
  message: string;
  mainButton: string;
  isDanger?: boolean;
}

interface ConfirmationModalProps {
  texts: ConfirmationTexts;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (responseIds: string[], status: StatusTypes) => void;
}

const ConfirmationModal = ({
  texts,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  const { checkedRows } = useCheckedRows();

  const handleConfirmation = useCallback(() => {
    onConfirm(checkedRows, texts?.action);
    onClose();
  }, [checkedRows, onClose, onConfirm, texts?.action]);

  return isOpen && !!texts ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{texts.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{texts.message}</ModalBody>

        <ModalFooter>
          <Button
            aria-label="Cancelar ação"
            colorScheme="gray"
            mr={3}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            aria-label={`${texts.mainButton} respostas`}
            bg={texts.isDanger ? "red.700" : "cyan.700"}
            color="white"
            onClick={handleConfirmation}
            _hover={{ bg: texts.isDanger ? "red.900" : "cyan.900" }}
          >
            {texts.mainButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
};

export default ConfirmationModal;
