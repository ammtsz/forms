import { ColumnShape } from "react-base-table";

export type CellProps = {
  rowData: { id: string; notes: string };
  column: ColumnShape;
};
