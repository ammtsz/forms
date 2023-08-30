"use client";

import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import useToast from "@app/hooks/useToast";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

interface OpenAIReturn {
  isFieldLoading: boolean;
  isTitleLoading: boolean;
  topic: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAIFieldButton: () => void;
  handleAITitleButton: () => void;
}

const useOpenAI = (): OpenAIReturn => {
  const [isTitleLoading, setTitleLoading] = useState(false);
  const [isFieldLoading, setFieldLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const { t, i18n } = useTranslation();

  const { addFields, updateTitle, updateDescription, fields, description } =
    useFormCreation();

  const {
    generateField,
    generateTitleAndDescription,
    updateTopic,
    updateMessages,
    setDisabled,
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
      setDisabled(value.length < 3 || value.length > 100);
    },
    [setDisabled]
  );

  const handleAIFieldButton = useCallback(async () => {
    try {
      setFieldLoading(true);
      setDisabled(true);

      updateTopic(topic.trim());
      updateMessages(fields);

      const response = await generateField(
        i18n.resolvedLanguage || "en",
        JSON.stringify(description)
      );

      if (response.error) {
        errorToast(`${response.error} ${t("feedbacks.retry")}`);
      } else if (response) {
        addFields([response]);
      }
    } catch (error) {
      errorToast(
        `${t("create.ai.feedbacks.unableCreateField")} ${t("feedbacks.retry")}`
      );
    } finally {
      setFieldLoading(false);
      setDisabled(false);
    }
  }, [
    t,
    topic,
    fields,
    description,
    i18n.resolvedLanguage,
    setDisabled,
    updateTopic,
    updateMessages,
    generateField,
    errorToast,
    addFields,
  ]);

  const handleAITitleButton = useCallback(async () => {
    try {
      setTitleLoading(true);
      setDisabled(true);

      updateTopic(topic.trim());
      updateMessages(fields);

      const response = await generateTitleAndDescription(
        i18n.resolvedLanguage || "en"
      );

      if (response.error) {
        errorToast(`${response.error} ${t("feedbacks.retry")}`);
      } else {
        updateTitle(response.title || "");
        updateDescription(response.description || "");
      }
    } catch (error) {
      errorToast(
        `${t("create.ai.feedbacks.unableCreateTitleAndDescription")} ${t(
          "feedbacks.retry"
        )}`
      );
    } finally {
      setTitleLoading(false);
      setDisabled(false);
    }
  }, [
    t,
    topic,
    fields,
    i18n.resolvedLanguage,
    setDisabled,
    updateTopic,
    updateMessages,
    generateTitleAndDescription,
    errorToast,
    updateTitle,
    updateDescription,
  ]);

  return {
    isTitleLoading,
    isFieldLoading,
    topic,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  };
};

export default useOpenAI;
