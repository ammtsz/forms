"use client";

import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { FieldsType } from "@forms/types/interfaces/field";
import { uuid } from "@forms/utils";

import Tooltip from "@app/components/Tooltip";
import { useFormCreation } from "@app/store/formCreation";
import { getFieldLabel, getFields } from "@app/utils/fieldsLabels";

interface AddFieldButtonProps {
  handleAIFieldButton: () => void;
  isAILoading: boolean;
  isAIDisabled: boolean;
  isAIVisible: boolean;
}

const AddFieldButton: React.FC<AddFieldButtonProps> = ({
  handleAIFieldButton,
  isAILoading,
  isAIDisabled,
  isAIVisible,
}) => {
  const { addField } = useFormCreation();

  const { t } = useTranslation();

  const handleNewFieldClick = useCallback(
    (type: FieldsType) => {
      addField({
        id: `${type}--${uuid()}`,
        label: "",
        type,
      });
    },
    [addField]
  );

  const renderButton = (label: string, value: FieldsType) => (
    <Button
      key={value}
      bg="whiteAlpha.900"
      fontSize={["sm", "sm", "md"]}
      onClick={() => handleNewFieldClick(value)}
      flexGrow={1}
    >
      {label}
    </Button>
  );

  const aiTip = isAIDisabled
    ? t("create.ai.disabledFieldTip")
    : isAILoading
    ? t("create.ai.creatingTip")
    : t("create.ai.fieldTip");

  return (
    <Flex bg="blackAlpha.100" flexDir={"column"} p={8} borderRadius={10} my="4">
      <i className="mr-auto mb-4">{t("create.labels.addField")}</i>
      <div className="flex flex-wrap gap-4">
        {isAIVisible && (
          <Tooltip label={aiTip}>
            <Button
              bg="whiteAlpha.900"
              border="1px solid gray"
              fontSize={["sm", "sm", "md"]}
              flexGrow={1}
              onClick={handleAIFieldButton}
              px={1}
              isDisabled={isAIDisabled}
            >
              {isAILoading ? <Spinner h={4} w={4} /> : "AI"}
            </Button>
          </Tooltip>
        )}
        {getFields().map((type) => renderButton(getFieldLabel(type), type))}
      </div>
    </Flex>
  );
};

export default AddFieldButton;
