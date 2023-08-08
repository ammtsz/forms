"use client";

import { TableCell } from "@/components/Responses/Table/styles";
import Tooltip from "@/components/Tooltip";
import { Text } from "@chakra-ui/react";
import React from "react";

import {
  formatDateAndHour,
  getPrefixFromString,
  isToggleTypeField,
} from "@forms/utils";

interface TextCellProps {
  text: string;
  fieldId: string;
}

const TextCell: React.FC<TextCellProps> = ({ text, fieldId: id }) => {
  const fieldType = getPrefixFromString(id);

  const getValue = () => {
    if (text && id === "created-at") {
      return formatDateAndHour(text);
    }

    if (fieldType && isToggleTypeField(fieldType)) {
      return text === "true" ? "Sim" : text === "false" ? "Não" : "";
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
