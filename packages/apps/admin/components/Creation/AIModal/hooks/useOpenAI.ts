"use client";

import React, { useCallback, useState } from "react";

import { FieldProps } from "@forms/types/interfaces/field";

import useToast from "@app/hooks/useToast";
import { useFormCreation } from "@app/store/formCreation";

interface OpenAIProps {
  onClose: () => void;
}

interface OpenAIReturn {
  isLoading: boolean;
  subject: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAIButton: () => void;
}

const useOpenAI = ({ onClose }: OpenAIProps): OpenAIReturn => {
  const [isLoading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  const { addFields, updateTitle, updateDescription } = useFormCreation();

  const { openToast } = useToast();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(event.target.value);
    },
    []
  );

  const handleAIButton = useCallback(async () => {
    try {
      setLoading(true);

      const aiResponse = await fetch("/api/openai", {
        method: "POST",
        body: JSON.stringify({
          content: subject,
        }),
      });

      const response = await aiResponse.json();

      if (response.error) {
        openToast({
          description: `${response.error} Tente novamente.`,
          status: "error",
          duration: null,
        });
      } else {
        const openAIForm = JSON.parse(response);

        updateTitle(openAIForm.title || "");
        updateDescription(openAIForm.description || "");
        addFields(openAIForm.fields as FieldProps[]);
        onClose();
      }
    } catch (error) {
      openToast({
        description: "Não foi possível gerar o formulário. Tente novamente.",
        status: "error",
        duration: null,
      });
    } finally {
      setLoading(false);
    }
  }, [subject, addFields, onClose, openToast, updateDescription, updateTitle]);

  return {
    isLoading,
    subject,
    handleInputChange,
    handleAIButton,
  };
};

export default useOpenAI;
