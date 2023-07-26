"use client";

import { useTableData } from "@/store/tableData";
import BaseTable, { AutoResizer } from "react-base-table";
import "react-base-table/styles.css";

import Feedback from "../../Feedback";
import useTable from "./hooks/useTable";
import { Container } from "./styles";

export interface TableProps {
  isLoading?: boolean;
}

const Table: React.FC<TableProps> = ({ isLoading = false }: TableProps) => {
  const { filteredTableData, formId, getSortBy } = useTableData();

  const {
    handleColumnSort,
    handleNextPage,
    columns,
    hasFrozenColumn,
    rowHeight,
    tableHeight,
  } = useTable(isLoading);

  return (
    <Container
      id={formId}
      height={`${tableHeight}px`}
      maxHeight={`${tableHeight}px`}
      minHeight={`${rowHeight}px`}
    >
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            columns={columns}
            data={isLoading ? [] : filteredTableData}
            emptyRenderer={
              <Feedback
                isLoading={isLoading}
                message="Nenhuma resposta encontrada"
              />
            }
            fixed={hasFrozenColumn}
            headerHeight={rowHeight}
            height={height}
            onColumnSort={handleColumnSort}
            onEndReached={handleNextPage}
            onEndReachedThreshold={100}
            rowHeight={rowHeight}
            sortBy={getSortBy()}
            width={width}
          />
        )}
      </AutoResizer>
    </Container>
  );
};

export default Table;
