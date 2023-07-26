"use client"

import { useCallback } from "react";
import { ColumnShape, SortOrder } from "react-base-table";

import { HEADER_HEIGHT } from "@/constants/table";
import { useTableData } from "@/store/tableData";

import { getColumns, getScrollbarWidth } from "../../../../components/View/Table/utils";

interface TablePropsReturn {
  handleColumnSort: (args: {
    column: ColumnShape;
    key: React.Key;
    order: SortOrder;
  }) => void;
  handleNextPage: () => void;
  columns: ColumnShape[];
  hasFrozenColumn: boolean;
  rowHeight: number;
  tableHeight: number;
}

const useTable = (isLoading: boolean): TablePropsReturn => {
  const {
    filteredTableData,
    setSortBy,
    sortResponses,
    getFieldsColumns,
    incrementPage,
  } = useTableData();

  const rowHeight = 48;
  const fieldsColumns = getFieldsColumns();
  const columns = getColumns(fieldsColumns);
  const hasFrozenColumn = columns && columns.some(({ frozen }) => !!frozen);
  const scrollbarWidth = getScrollbarWidth();

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

  const getTableMaxHeight = () => {
    return window.innerHeight - HEADER_HEIGHT;
  };

  const handleNextPage = useCallback(() => {
    incrementPage();
  }, [incrementPage]);

  return {
    handleColumnSort,
    handleNextPage,
    columns,
    hasFrozenColumn,
    rowHeight,
    tableHeight: Math.min(getTableHeight(), getTableMaxHeight()),
  };
};

export default useTable;
