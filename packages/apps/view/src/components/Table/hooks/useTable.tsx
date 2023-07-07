import { useCallback } from "react";
import { ColumnShape, SortOrder } from "react-base-table";

import { useTableData } from "@app/store/tableData";

import { getColumns } from "../utils";

interface TablePropsReturn {
  handleColumnSort: (args: {
    column: ColumnShape;
    key: React.Key;
    order: SortOrder;
  }) => void;
  columns: ColumnShape[];
  hasFrozenColumn: boolean;
  rowHeight: number;
  tableHeight: number;
}

const useTable = (isLoading: boolean): TablePropsReturn => {
  const { filteredTableData, setSortBy, sortResponses, getFieldsColumns } =
    useTableData();

  const rowHeight = 48;
  const fieldsColumns = getFieldsColumns();
  const columns = getColumns(fieldsColumns);
  const hasFrozenColumn = columns && columns.some(({ frozen }) => !!frozen);
  const scrollbarWidth = 0;

  const handleColumnSort = useCallback(
    ({ key, order }) => {
      sortResponses(key, order);
      setSortBy(key, order);
    },
    [setSortBy, sortResponses]
  );

  const getTableHeight = () => {
    const rowsHeight =
      filteredTableData && filteredTableData.length && !isLoading
        ? (filteredTableData.length + 1) * rowHeight
        : 800;
    return hasFrozenColumn ? rowsHeight + scrollbarWidth : rowsHeight;
  };

  return {
    handleColumnSort,
    columns,
    hasFrozenColumn,
    rowHeight,
    tableHeight: getTableHeight(),
  };
};

export default useTable;
