"use client";

import { Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  formatDateAndHour,
  getPrefixFromString,
  isToggleTypeField,
} from "@forms/utils";

import { TableCell } from "@app/components/Responses/Table/styles";
import Tooltip from "@app/components/Tooltip";

interface TextCellProps {
  text: string;
  fieldId: string;
}

const TextCell: React.FC<TextCellProps> = ({ text, fieldId: id }) => {
  const { t } = useTranslation();

  const fieldType = getPrefixFromString(id);

  const getValue = () => {
    if (text && id === "created-at") {
      return formatDateAndHour(text);
    }

    if (fieldType && isToggleTypeField(fieldType)) {
      return text === "true"
        ? t("commons.yes")
        : text === "false"
        ? t("commons.no")
        : "";
    }

    return text || "";
  };

  return (
    <TableCell>
      <Tooltip label={text}>
        <Text
          fontSize="sm"
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          w="100%"
        >
          {getValue()}
        </Text>
      </Tooltip>
    </TableCell>
  );
};

export default TextCell;
