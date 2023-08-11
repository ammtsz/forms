"use client";

import { Checkbox } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import { TableCell } from "@app/components/Responses/Table/styles";
import { useCheckedRows } from "@app/store/checkedRows";

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
        colorScheme="telegram"
      />
    </TableCell>
  );
};

export default CheckboxHeaderCell;
