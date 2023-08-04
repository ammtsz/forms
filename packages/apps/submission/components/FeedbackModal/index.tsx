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
          <Button
            bg="cyan.800"
            colorScheme="black"
            justifyContent={"center"}
            m="auto"
            w="100%"
            onClick={onClose}
            _hover={{ bg: "cyan.900" }}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
};

export default FeedbackModal;
