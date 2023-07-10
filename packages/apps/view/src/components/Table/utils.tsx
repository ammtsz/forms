import { ColumnShape } from "react-base-table";

import { CellProps } from "@app/types";

import CheckboxCell from "./CheckboxCell";
import CheckboxHeaderCell from "./CheckboxHeaderCell";
import EditableCell from "./EditableCell";

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
  ...fieldsColumns.map((column) => {
    if (column.key === "notes") {
      return {
        ...column,
        width: 250,
        cellRenderer: (props: CellProps) => (
          <EditableCell rowData={props.rowData} />
        ),
      } as ColumnShape;
    }

    return { ...column } as ColumnShape;
  }),
];
