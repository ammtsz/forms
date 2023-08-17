"use client";

import {
  Input,
  useDisclosure,
  Tooltip,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

import { useFormCreation } from "@app/store/formCreation";

import useOpenAI from "./hooks/useOpenAI";

const AISection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fields } = useFormCreation();

  const {
    isLoading,
    topic,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  } = useOpenAI();

  return (
    <>
      {!isOpen ? (
        <Tooltip
          label={"Defina um tema para gerar campos com ajuda de uma IA."}
          isDisabled={fields.length === 0}
        >
          <button onClick={onOpen} type="button" className="secondary_btn">
            Mostrar opções de IA
          </button>
        </Tooltip>
      ) : (
        <div className="w-full">
          <button onClick={onClose} className="link_btn ml-auto">
            fechar
          </button>
          <FormControl>
            <FormLabel>
              Indique um tema para o formulário para gerar sugestões de título,
              descrição e campos.
            </FormLabel>
            <Input
              mt={4}
              placeholder="Digite um tema"
              aria-label="Tema do formulário"
              type="text"
              value={topic}
              onChange={handleInputChange}
            />
            <FormErrorMessage>
              O tema deve ter de 3 a 100 caracteres.
            </FormErrorMessage>
          </FormControl>
          <div className="flex gap-2 w-full mt-4 justify-end">
            <button
              onClick={handleAIFieldButton}
              type="button"
              className="primary_btn"
              disabled={isLoading}
            >
              {isLoading ? "Gerando novo campo..." : "Gerar novo campo"}
            </button>
            <button
              onClick={handleAITitleButton}
              type="button"
              className="primary_btn"
              disabled={isLoading}
            >
              {isLoading
                ? "Gerando  título e descrição..."
                : "Gerar título e descrição"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AISection;
