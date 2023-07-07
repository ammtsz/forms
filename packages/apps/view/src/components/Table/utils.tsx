import { ColumnShape } from "react-base-table";

import { CellProps } from "@app/types";

import CheckboxCell from "./CheckboxCell";
import CheckboxHeaderCell from "./CheckboxHeaderCell";

export const getColumns = (fieldsColumns: ColumnShape[]): ColumnShape[] => [
  {
    key: "id",
    dataKey: "id",
    frozen: "left",
    width: 48,
    headerRenderer: ({ container: { props: rows } }) => (
      <CheckboxHeaderCell responses={rows.data as { id: string }[]} />
    ),
    cellRenderer: (props: CellProps) => (
      <CheckboxCell rowData={props.rowData} />
    ),
  } as ColumnShape,
  ...fieldsColumns,
];
