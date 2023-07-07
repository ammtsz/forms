import { ColumnShape } from "react-base-table";
import { create } from "zustand";

import {
  getFormResponses as getFormResponsesFromDb,
  getForm as getFormFromDb,
} from "@app/api/services/forms";
import { SortOrder } from "@app/constants/order";
import { Tabs } from "@app/constants/tabs";

import { TableDataState, TableDataStore } from "./types";
import { filterBySearchTerm, filterByTab, processResponsesData } from "./utils";

const INITIAL_STATE: TableDataState = {
  errors: null,
  fields: [],
  filteredFields: [],
  filteredTableData: [],
  formId: "",
  isLoading: false,
  responses: [],
  searchData: [],
  searchTerm: "",
  sortBy: {
    key: "",
    order: SortOrder.asc,
  },
  tab: "",
  tableData: [],
  title: "",
};

const store = create<TableDataStore>((set, get) => ({
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  filteredFields: INITIAL_STATE.filteredFields,
  filteredTableData: INITIAL_STATE.filteredTableData,
  formId: INITIAL_STATE.formId,
  isLoading: INITIAL_STATE.isLoading,
  responses: INITIAL_STATE.responses,
  searchData: INITIAL_STATE.searchData,
  searchTerm: INITIAL_STATE.searchTerm,
  sortBy: INITIAL_STATE.sortBy,
  tab: INITIAL_STATE.tab,
  tableData: INITIAL_STATE.tableData,
  title: INITIAL_STATE.title,

  loadForm: async (formId) => {
    const form = await getFormFromDb(formId);

    const fields = [
      ...form.fields,
      { id: "created-at", label: "Criado em", type: "date" },
    ];

    set({
      formId: form.id,
      title: form.title,
      fields,
      filteredFields: fields,
    });
  },

  loadFormResponses: async (formId) => {
    const responses = await getFormResponsesFromDb(formId);
    set({ responses });
    get().generateTableData();
  },

  generateTableData: () => {
    const { responses, fields } = get();

    if (responses.length && fields.length) {
      const { tableData, searchData } = processResponsesData(responses, fields);
      set({ tableData, searchData });

      get().filterTableData({ tab: Tabs.all });
    }
  },

  getFieldsColumns: () => {
    return get().filteredFields.map((column, index) => {
      const frozen = index ? {} : { frozen: "left" };

      return {
        title: column.label,
        dataKey: column.id,
        key: column.id,
        width: index ? 200 : 100,
        resizable: true,
        sortable: true,
        ...frozen,
      };
    }) as ColumnShape[];
  },

  sortResponses: (key, order) => {
    const { filteredTableData } = get();

    set(() => ({
      filteredTableData: filteredTableData.sort((a, b) => {
        return a[key] < b[key]
          ? order === SortOrder.asc
            ? -1
            : 1
          : order === SortOrder.asc
          ? 1
          : -1;
      }),
    }));
  },

  setSortBy: (key, order) => set(() => ({ sortBy: { key, order } })),

  setSearchTerm: (searchTerm) => set(() => ({ searchTerm })),

  filterTableData: ({ tab: newTab, searchTerm: newSearchTerm }) => {
    const { tableData, searchData, resetSortBy } = get();
    const tab = newTab || get().tab;
    const searchTerm =
      typeof newSearchTerm === "string" ? newSearchTerm : get().searchTerm;

    set(() => ({
      filteredTableData: searchTerm
        ? filterBySearchTerm(searchTerm, searchData, tableData, tab)
        : filterByTab(tab, tableData),
      searchTerm,
      tab,
    }));
    resetSortBy();
  },

  filterColumns: (columnsIds) => {
    set(({ fields }) => ({
      filteredFields: fields.filter(({ id }) =>
        columnsIds.some((columnId) => columnId === id)
      ),
    }));

    get().resetSortBy();
  },

  getFilteredTableData: () => get().filteredTableData,

  getFields: () => get().fields,

  getSortBy: () => get().sortBy,

  // sortResponses: (columnKey, order) => {

  // },

  // deleteResponses: (responses) => {

  // },

  // updateResponses: (responses) => {

  // },

  resetSortBy: () => set(() => ({ sortBy: INITIAL_STATE.sortBy })),

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
