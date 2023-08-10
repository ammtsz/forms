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

interface FeedbackModalProps {
  buttonText: string;
  message?: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  buttonText,
  message,
  title,
  isOpen,
  onClose,
}) => {
  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>{message}</ModalBody>

        <ModalFooter mt={4}>
          <button onClick={onClose} className="primary_btn w-full">
            {buttonText}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
};

export default FeedbackModal;
