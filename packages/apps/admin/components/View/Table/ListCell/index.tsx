"use client";

import Tooltip from "@/components/Tooltip";
import { TableCell } from "@/components/View/Table/styles";
import { Text } from "@chakra-ui/react";
import React from "react";

interface ListCellProps {
  text: string;
}

const ListCell: React.FC<ListCellProps> = ({ text }) => {
  const getValue = () => {
    return JSON.parse(text).join(", ");
  };

  const getTooltipValue = () => {
    return JSON.parse(text).map((item: string, i: number) => (
      <div key={i}>{`✓ ${item}`}</div>
    ));
  };

  return (
    <TableCell>
      <Tooltip label={getTooltipValue()}>
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

export default ListCell;
