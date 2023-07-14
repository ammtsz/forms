import { Checkbox } from "@chakra-ui/react";
import React, { useCallback } from "react";

import { useCheckedRows } from "@app/store/checkedRows";

import { TableCell } from "../styles";

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
