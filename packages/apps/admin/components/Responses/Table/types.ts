import { ColumnShape } from "react-base-table";

import { FieldsType } from "@forms/types/interfaces/field";

export type CellProps = {
  cellData: string;
  rowData: { id: string; notes: string };
  column: ColumnShape;
};

export type ColumnType = FieldsType & "notes" & "created-at";
