import { ColumnShape, SortOrder } from "react-base-table";

import { FieldProps } from "@forms/types/interfaces/field";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { SortOrderTypes } from "@/constants/order";
import { StatusTypes } from "@/constants/status";

export interface SortBy {
  key: string;
  order: SortOrder;
}

export interface TableData {
  [key: string]: string;
}

export type TabTypes = StatusTypes | "all";
export interface TableDataState {
  errors: string[] | null;
  fields: FieldProps[];
  filteredFields: FieldProps[];
  filteredTableData: TableData[];
  formId: string;
  isLoading: boolean;
  page: number;
  responses: FormValuesProps[];
  searchData: string[][];
  searchTerm: string;
  sortBy: SortBy;
  tab: TabTypes;
  tableData: TableData[];
  title: string;
}

export interface TableDataStore extends TableDataState {
  loadForm: (formId: string) => Promise<void>;
  loadFormResponses: (formId: string) => Promise<void>;
  generateTableData: () => void;
  filterTableData: (props: { tab?: TabTypes; searchTerm?: string }) => void;
  filterColumns: (columnsIds: string[]) => void;
  sortResponses: (key: string, order: SortOrderTypes) => void;
  setSortBy: (key: string, order: SortOrderTypes) => void;
  setSearchTerm: (searchTerm: string) => void;
  getFieldsColumns: () => ColumnShape[];
  getSortBy: () => SortBy;
  getFields: () => FieldProps[];
  getFilteredTableData: () => TableData[];
  updateResponseStatus: (responsesIds: string[], status: StatusTypes) => void;
  updateResponseNote: (notes: string, id: string) => void;
  incrementPage: () => void;
  resetPage: () => void;
  resetSortBy: () => void;
  reset: () => void;
}