"use client";

import { TableCell } from "@/components/Responses/Table/styles";
import Tooltip from "@/components/Tooltip";
import { Text } from "@chakra-ui/react";
import React from "react";

interface HeaderCellProps {
  text: string;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ text }) => {
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
          {text}
        </Text>
      </Tooltip>
    </TableCell>
  );
};

export default HeaderCell;
