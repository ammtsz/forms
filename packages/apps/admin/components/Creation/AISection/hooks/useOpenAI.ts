"use client";

import React, { useCallback, useState } from "react";

import useToast from "@app/hooks/useToast";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

interface OpenAIReturn {
  isFieldLoading: boolean;
  isTitleLoading: boolean;
  topic: string;
  hasError: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAIFieldButton: () => void;
  handleAITitleButton: () => void;
}

const useOpenAI = (): OpenAIReturn => {
  const [isTitleLoading, setTitleLoading] = useState(false);
  const [isFieldLoading, setFieldLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [hasError, setError] = useState(false);

  const { addFields, updateTitle, updateDescription, fields } =
    useFormCreation();

  const {
    generateField,
    generateTitleAndDescription,
    updateTopic,
    updateMessages,
  } = useOpenaiRequest();

  const { openToast } = useToast();

  const errorToast = useCallback(
    (message: string) =>
      openToast({ description: message, status: "error", duration: null }),
    [openToast]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setTopic(value);
      setError(value.length < 3 || value.length > 100);
    },
    []
  );

  const handleAIFieldButton = useCallback(async () => {
    try {
      setFieldLoading(true);

      updateTopic(topic.trim());
      updateMessages(fields);

      const response = await generateField();

      if (response.error) {
        errorToast(`${response.error} Tente novamente.`);
      } else {
        addFields([response]);
      }
    } catch (error) {
      errorToast("Não foi possível criar um novo campo. Tente novamente.");
    } finally {
      setFieldLoading(false);
    }
  }, [
    topic,
    fields,
    updateTopic,
    updateMessages,
    generateField,
    errorToast,
    addFields,
  ]);

  const handleAITitleButton = useCallback(async () => {
    try {
      setTitleLoading(true);

      updateTopic(topic.trim());
      const response = await generateTitleAndDescription();

      if (response.error) {
        errorToast(`${response.error} Tente novamente.`);
      } else {
        updateTitle(response.title || "");
        updateDescription(response.description || "");
      }
    } catch (error) {
      errorToast(
        "Não foi possível gerar um titulo e uma descrição. Tente novamente."
      );
    } finally {
      setTitleLoading(false);
    }
  }, [
    topic,
    updateTopic,
    generateTitleAndDescription,
    errorToast,
    updateTitle,
    updateDescription,
  ]);

  return {
    isTitleLoading,
    isFieldLoading,
    topic,
    hasError,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  };
};

export default useOpenAI;
