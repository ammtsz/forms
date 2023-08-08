import React from "react";
import { ColumnShape } from "react-base-table";

import { Fields, getPrefixFromString } from "@forms/utils";

import EditableCell from "../EditableCell";
import ListCell from "../ListCell";
import TextCell from "../TextCell";
import { ColumnType } from "../types";

export interface CellsByTypeProps {
  cellData: string;
  column: ColumnShape;
  columnIndex?: number;
  rowData: {
    id: string;
    notes: string;
  };
}

const CellsByType: React.FC<CellsByTypeProps> = ({
  cellData,
  column,
  rowData,
}) => {
  const { dataKey, key } = column;
  const { notes, id } = rowData;

  const columnType = getPrefixFromString(dataKey as string) as ColumnType;

  switch (columnType) {
    case "notes":
      return <EditableCell responseId={id} notes={notes} />;

    case Fields.checkboxes:
      return <ListCell text={cellData} />;

    default:
      return <TextCell text={cellData} fieldId={key as string} />;
  }
};

export default CellsByType;
