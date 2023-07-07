import BaseTable, { AutoResizer } from "react-base-table";
import "react-base-table/styles.css";

import { useTableData } from "@app/store/tableData";

import useTable from "./hooks/useTable";
import { Container } from "./styles";

export interface TableProps {
  isLoading?: boolean;
}

const Table: React.FC<TableProps> = ({ isLoading = false }: TableProps) => {
  const { filteredTableData, getSortBy } = useTableData();

  const { handleColumnSort, columns, hasFrozenColumn, rowHeight, tableHeight } =
    useTable(isLoading);

  return (
    <Container
      height={`${tableHeight}px`}
      maxHeight={`${tableHeight}px`}
      minHeight={`${rowHeight}px`}
    >
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            columns={columns}
            data={isLoading ? [] : filteredTableData}
            emptyRenderer={<div>no content</div>}
            fixed={hasFrozenColumn}
            headerHeight={rowHeight}
            height={height}
            onColumnSort={handleColumnSort}
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
