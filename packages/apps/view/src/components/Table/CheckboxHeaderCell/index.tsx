import { Checkbox } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import { useCheckedRows } from "@app/store/checkedRows";

import { TableCell } from "../styles";
interface CheckboxHeaderCellProps {
  responses: { id: string }[];
}

const CheckboxHeaderCell: React.FC<CheckboxHeaderCellProps> = ({
  responses,
}) => {
  const {
    isAllChecked,
    isIndeterminate,
    reset,
    setTotalRows,
    toggleAllCheckStates,
  } = useCheckedRows();

  const handleChange = useCallback((): void => {
    const ids = responses.map(({ id }) => id);

    toggleAllCheckStates(ids);
  }, [responses, toggleAllCheckStates]);

  useEffect(() => {
    setTotalRows(responses.length);

    return () => reset();
  }, [responses, reset, setTotalRows]);

  return (
    <TableCell>
      <Checkbox
        isChecked={isAllChecked()}
        isIndeterminate={isIndeterminate()}
        onChange={handleChange}
        colorScheme="cyan"
      />
    </TableCell>
  );
};

export default CheckboxHeaderCell;
