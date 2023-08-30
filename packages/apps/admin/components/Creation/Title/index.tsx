"use client";

import {
  Input,
  FormControl,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import Tooltip from "@app/components/Tooltip";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

const Title = ({
  handleAITitleButton,
  isAILoading,
  hasTitleError,
  handleTitle,
}) => {
  const { title } = useFormCreation();

  const { isVisible: isAIVisible, isDisabled: isAIDisabled } =
    useOpenaiRequest();

  const { t } = useTranslation();

  const aiTip = isAIDisabled
    ? t("create.ai.disabledTitleTip")
    : isAILoading
    ? t("create.ai.creatingTip")
    : t("create.ai.titleTip");

  return (
    <FormControl isInvalid={hasTitleError} mb={8}>
      <div className="flex">
        <Input
          id="create-title"
          variant={hasTitleError ? "flushed" : "unstyled"}
          size="lg"
          color="blackAlpha.900"
          placeholder={t("create.placeholders.addTitle")}
          textAlign="center"
          fontSize={["lg", "xl", "2xl"]}
          onChange={handleTitle}
          value={title}
        />
        {isAIVisible && (
          <Tooltip label={aiTip}>
            <button
              onClick={handleAITitleButton}
              type="button"
              className="secondary_btn small_padding"
              disabled={isAIDisabled}
            >
              {isAILoading ? <Spinner h={4} w={4} /> : "AI"}
            </button>
          </Tooltip>
        )}
      </div>
      {hasTitleError && (
        <FormErrorMessage mt={0}>{t("commons.requiredField")}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Title;
