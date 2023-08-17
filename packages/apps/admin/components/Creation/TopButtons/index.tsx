"use client";

import { useDisclosure } from "@chakra-ui/react";
import React, { useCallback } from "react";

import ConfirmationModal from "@app/components/ConfirmationModal";
import AISection from "@app/components/Creation/AISection";
import { useFormCreation } from "@app/store/formCreation";

import { Container } from "./styles";

const TopButtons = () => {
  const { reset } = useFormCreation();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleCleanForm = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <Container mx={[6, 12, 10, 10, "auto"]} my={[6, 6, 10]}>
        <button className="secondary_btn" onClick={onOpen}>
          Limpar formulário
        </button>
        <AISection />
      </Container>
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

export default TopButtons;
