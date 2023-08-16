"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import useOpenAI from "./hooks/useOpenAI";

const AIModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, subject, handleInputChange, handleAIButton } = useOpenAI({
    onClose,
  });

  return (
    <>
      <button onClick={onOpen} type="button" className="primary_btn">
        Criar com IA
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tema do formulário</ModalHeader>
            <ModalCloseButton isDisabled={isLoading} />
            <ModalBody>
              Indique um tema para que uma sugestão de campos possa ser gerada.
              <Input
                mt={4}
                placeholder="Digite um tema"
                aria-label="Tema do formulário"
                type="text"
                value={subject}
                onChange={handleInputChange}
              />
            </ModalBody>

            <ModalFooter>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="tertiary_btn mr-3"
              >
                Cancelar
              </button>
              <button
                onClick={handleAIButton}
                type="button"
                className="primary_btn"
                disabled={isLoading}
              >
                {isLoading ? "Gerando formulário..." : "Gerar formulário"}
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AIModal;
