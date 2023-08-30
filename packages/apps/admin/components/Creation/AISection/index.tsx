"use client";

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AISection = ({
  setFormDisabled,
  isOpen,
  isLoading,
  topic,
  handleInputChange,
}) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormDisabled(isLoading);
  }, [isLoading, setFormDisabled]);

  return isOpen ? (
    <Flex
      direction="column"
      pb={[8, 8, 12]}
      mb={[4, 6, 8]}
      borderRadius="10"
      width="100%"
    >
      <FormControl isInvalid={topic.length < 3 || topic.length > 100}>
        <FormLabel display="flex" alignItems="center">
          {t("create.ai.topicInputLabelPt1")}
          <span className="secondary_box cursor-pointer small_padding w-10 mx-2">
            {t("commons.ai")}
          </span>
          {t("create.ai.topicInputLabelPt2")}
        </FormLabel>
        <div className="flex">
          <Input
            ref={inputRef}
            placeholder={t("create.ai.topicInputPlaceholder")}
            type="text"
            value={topic}
            onChange={handleInputChange}
            variant={"flushed"}
          />
        </div>
        <FormErrorMessage>{t("create.ai.topicInputHint")}</FormErrorMessage>
      </FormControl>
    </Flex>
  ) : null;
};

export default AISection;
