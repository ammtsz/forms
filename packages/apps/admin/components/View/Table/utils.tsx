import CheckboxCell from "@/components/View/Table/CheckboxCell";
import CheckboxHeaderCell from "@/components/View/Table/CheckboxHeaderCell";
import { CellProps } from "@/components/View/Table/types";
import { ColumnShape } from "react-base-table";

import CellsByType from "./CellsByType";
import HeaderCell from "./HeaderCell";

export const getColumns = (fieldsColumns: ColumnShape[]): ColumnShape[] => {
  return [
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
      return {
        ...column,
        cellRenderer: (props: CellProps) => <CellsByType {...props} />,
        headerRenderer: () => <HeaderCell text={column.title as string} />,
      } as ColumnShape;
    }),
  ];
};

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
