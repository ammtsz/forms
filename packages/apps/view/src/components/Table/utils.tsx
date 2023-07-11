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

export const getScrollbarWidth = (): number => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  const parentNode = outer.parentNode as HTMLDivElement;
  parentNode.removeChild(outer);

  return scrollbarWidth - 4;
};
