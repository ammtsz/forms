"use client";

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
import { StatusTypes } from "@constants/status";
import { useCheckedRows } from "@store/checkedRows";
import { useCallback } from "react";

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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  texts,
  isOpen,
  onClose,
  onConfirm,
}) => {
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
            colorScheme="telegram"
            mr={3}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <button
            aria-label={texts.mainButton}
            onClick={handleConfirmation}
            className="primary_btn"
          >
            {texts.mainButton}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
};

export default ConfirmationModal;
