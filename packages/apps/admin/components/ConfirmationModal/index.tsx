"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { StatusTypes } from "@app/constants/status";
import { useCheckedRows } from "@app/store/checkedRows";

export interface ConfirmationTexts {
  action?: StatusTypes;
  title: string;
  message: string;
  mainButton: string;
  isDanger?: boolean;
}

interface ConfirmationModalProps {
  texts: ConfirmationTexts;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
}

// TODO: refactor component to be more generic

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  texts,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { checkedRows } = useCheckedRows();

  const handleConfirmation = useCallback(() => {
    if (texts?.action) {
      onConfirm({ responsesIds: checkedRows, status: texts.action });
    } else {
      onConfirm();
    }

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
          <button
            aria-label="Cancelar ação"
            className="light_btn mr-3"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            aria-label={texts.mainButton}
            onClick={handleConfirmation}
            className={texts.isDanger ? "danger_btn" : "primary_btn"}
          >
            {texts.mainButton}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
};

export default ConfirmationModal;
