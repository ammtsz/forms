import { ColumnShape, SortOrder } from "react-base-table";
export interface SortBy {
  key: string;
  order: SortOrder;
}

export interface TableData {
  [key: string]: string;
}

export type CellProps = {
  rowData: { id: string; contentFormatType: string };
  cellData: string;
  column: ColumnShape;
};