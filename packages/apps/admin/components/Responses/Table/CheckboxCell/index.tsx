"use client";

import { Checkbox } from "@chakra-ui/react";
import { TableCell } from "@components/Responses/Table/styles";
import { useCheckedRows } from "@store/checkedRows";
import React, { useCallback } from "react";

interface CheckboxCellProps {
  rowData: { id: string };
}

const CheckboxCell: React.FC<CheckboxCellProps> = ({ rowData }) => {
  const { toggleCheckState, isRowChecked } = useCheckedRows();

  const handleChange = useCallback((): void => {
    toggleCheckState(rowData.id);
  }, [toggleCheckState, rowData.id]);

  return (
    <TableCell>
      <Checkbox
        isChecked={isRowChecked(rowData.id)}
        onChange={handleChange}
        colorScheme="telegram"
      />
    </TableCell>
  );
};

export default CheckboxCell;
