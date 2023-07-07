import { ColumnShape } from "react-base-table";

import { FieldProps } from "@forms/types/interfaces/field";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { SortOrderTypes } from "@app/constants/order";
import { TabsTypes } from "@app/constants/tabs";
import { SortBy, TableData } from "@app/types";

export interface TableDataState {
  errors: string[] | null;
  fields: FieldProps[];
  filteredFields: FieldProps[];
  filteredTableData: TableData[];
  formId: string;
  isLoading: boolean;
  responses: FormValuesProps[];
  sortBy: SortBy;
  tab: TabsTypes;
  tableData: TableData[];
  title: string;
}

export interface TableDataStore extends TableDataState {
  loadForm: (formId: string) => Promise<void>;
  loadFormResponses: (formId: string) => Promise<void>;
  generateTableData: () => void;
  filterByTab: (tab?: TabsTypes) => void;
  filterColumns: (columnsIds: string[]) => void;
  sortResponses: (key: string, order: SortOrderTypes) => void;
  setSortBy: (key: string, order: SortOrderTypes) => void;
  getFieldsColumns: () => ColumnShape[];
  getSortBy: () => SortBy;
  getFields: () => FieldProps[];
  getFilteredTableData: () => TableData[];
  resetSortBy: () => void;
  reset: () => void;
}
