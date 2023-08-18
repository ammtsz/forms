"use client";

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { EyeOff as EyeOffIcon } from "react-feather";

import Tooltip from "@app/components/Tooltip";

import useOpenAI from "./hooks/useOpenAI";
import { Container, StickyButton, StickyForm } from "./styles";

const AISection = ({ setFormDisabled, isSubmitting }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isTitleLoading,
    isFieldLoading,
    topic,
    hasError,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  } = useOpenAI();

  const Sticky = isOpen ? StickyForm : StickyButton;

  useEffect(() => {
    setFormDisabled(isTitleLoading || isFieldLoading);
  }, [isTitleLoading, isFieldLoading, setFormDisabled]);

  const isDisabled =
    isTitleLoading || isFieldLoading || hasError || !topic || isSubmitting;

  return (
    <>
      <Sticky className={!isOpen ? "md:justify-end" : ""}>
        {!isOpen ? (
          <Tooltip label={"Mostrar opções de IA"}>
            <button
              onClick={onOpen}
              type="button"
              className="primary_btn round_btn mx-4 mt-4"
            >
              IA
            </button>
          </Tooltip>
        ) : (
          <Container mx={[0, 5, 10, 10, "auto"]} px={[6, 8, 12]} pt={12} pb={8}>
            <Tooltip label={"Esconder opções de IA"}>
              <button
                aria-label="Esconder opções de IA"
                onClick={onClose}
                className="absolute top-6 right-6 text-secondary"
              >
                <EyeOffIcon size={16} />
              </button>
            </Tooltip>
            <FormControl isInvalid={hasError}>
              <FormLabel>
                Informe o tema do formulário e crie um título, uma descrição e
                novos campos com a ajuda de uma IA.
              </FormLabel>
              <Input
                placeholder="Digite um tema"
                aria-label="Tema do formulário"
                type="text"
                value={topic}
                onChange={handleInputChange}
                boxShadow={"inner"}
              />
              <FormErrorMessage>
                O tema deve ter de 3 a 100 caracteres.
              </FormErrorMessage>
            </FormControl>
            <div className="flex gap-2 w-full mt-4 justify-end flex-col sm:flex-row">
              <Tooltip label="O título e a descrição são criados com base no tema.">
                <button
                  onClick={handleAITitleButton}
                  type="button"
                  className="primary_btn"
                  disabled={isDisabled}
                >
                  {isTitleLoading
                    ? "Criando título e descrição..."
                    : "Criar título e descrição"}
                </button>
              </Tooltip>
              <Tooltip label="Os campos são criados com base no tema e nos campos existentes.">
                <button
                  onClick={handleAIFieldButton}
                  type="button"
                  className="primary_btn"
                  disabled={isDisabled}
                >
                  {isFieldLoading ? "Criando campo..." : "Novo campo"}
                </button>
              </Tooltip>
            </div>
          </Container>
        )}
      </Sticky>
    </>
  );
};

export default AISection;
