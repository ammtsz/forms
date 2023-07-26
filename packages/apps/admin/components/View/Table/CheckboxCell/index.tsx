"use client";

import { TableCell } from "@/components/View/Table/styles";
import { useCheckedRows } from "@/store/checkedRows";
import { Checkbox } from "@chakra-ui/react";
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
        colorScheme="cyan"
      />
    </TableCell>
  );
};

export default CheckboxCell;
