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
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
          <Tooltip label={t("create.buttons.showAIOptions")}>
            <button
              aria-label={t("create.buttons.showAIOptions")}
              onClick={onOpen}
              type="button"
              className="primary_btn round_btn mx-4 mt-4"
            >
              IA
            </button>
          </Tooltip>
        ) : (
          <Container mx={[0, 5, 10, 10, "auto"]} px={[6, 8, 12]} pt={12} pb={8}>
            <Tooltip label={t("create.buttons.hideAIOptions")}>
              <button
                aria-label={t("create.buttons.hideAIOptions")}
                onClick={onClose}
                className="absolute top-6 right-6 text-secondary"
              >
                <EyeOffIcon size={16} />
              </button>
            </Tooltip>
            <FormControl isInvalid={hasError}>
              <FormLabel>{t("create.ai.topicInputLabel")}</FormLabel>
              <Input
                placeholder={t("create.ai.topicInputPlaceholder")}
                type="text"
                value={topic}
                onChange={handleInputChange}
                boxShadow={"inner"}
              />
              <FormErrorMessage>
                {t("create.ai.topicInputHint")}
              </FormErrorMessage>
            </FormControl>
            <div className="flex gap-2 w-full mt-4 justify-end flex-col sm:flex-row">
              <Tooltip label={t("create.ai.titleAndDescriptionTip")}>
                <button
                  onClick={handleAITitleButton}
                  type="button"
                  className="primary_btn"
                  disabled={isDisabled}
                >
                  {isTitleLoading
                    ? t("create.loading.creatingTitleAndDescription")
                    : t("create.buttons.createTitleAndDescription")}
                </button>
              </Tooltip>
              <Tooltip label={t("create.ai.fieldTip")}>
                <button
                  onClick={handleAIFieldButton}
                  type="button"
                  className="primary_btn"
                  disabled={isDisabled}
                >
                  {isFieldLoading
                    ? t("create.loading.creatingField")
                    : t("create.buttons.newField")}
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
