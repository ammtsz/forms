"use client";

import React, { useCallback, useState } from "react";

import useToast from "@app/hooks/useToast";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

interface OpenAIReturn {
  isLoading: boolean;
  topic: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAIFieldButton: () => void;
  handleAITitleButton: () => void;
}

const useOpenAI = (): OpenAIReturn => {
  const [isLoading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const { addFields, updateTitle, updateDescription } = useFormCreation();

  const { generateField, generateTitleAndDescription, updateTopic } =
    useOpenaiRequest();

  const { openToast } = useToast();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTopic(event.target.value);
    },
    []
  );

  const handleAIFieldButton = useCallback(async () => {
    try {
      setLoading(true);

      updateTopic(topic.trim());
      const response = await generateField();

      console.log({ response });

      if (response.error) {
        openToast({
          description: `${response.error} Tente novamente.`,
          status: "error",
          duration: null,
        });
      } else {
        addFields([response]);
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
  }, [updateTopic, topic, generateField, openToast, addFields]);

  const handleAITitleButton = useCallback(async () => {
    try {
      setLoading(true);

      updateTopic(topic.trim());
      const response = await generateTitleAndDescription();

      console.log({ response });

      if (response.error) {
        openToast({
          description: `${response.error} Tente novamente.`,
          status: "error",
          duration: null,
        });
      } else {
        updateTitle(response.title || "");
        updateDescription(response.description || "");
      }
    } catch (error) {
      openToast({
        description:
          "Não foi possível gerar um titulo e uma descrição. Tente novamente.",
        status: "error",
        duration: null,
      });
    } finally {
      setLoading(false);
    }
  }, [
    updateTopic,
    topic,
    generateTitleAndDescription,
    openToast,
    updateTitle,
    updateDescription,
  ]);

  return {
    isLoading,
    topic,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  };
};

export default useOpenAI;
