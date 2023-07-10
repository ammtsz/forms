import { ColumnShape } from "react-base-table";
import { create } from "zustand";

import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import {
  getFormResponses as getFormResponsesFromDb,
  getForm as getFormFromDb,
  updateResponse,
} from "@app/api/services/forms";
import { SortOrder } from "@app/constants/order";
import { Status } from "@app/constants/status";

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
    const frozenColumn = form.fields[0];

    const fields = [
      frozenColumn,
      { id: "notes", label: "Anotações", type: "textarea" },
      ...form.fields.splice(1),
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
    const availableResponses = responses.filter(
      (response) => !response.status || response.status.value !== Status.deleted
    );

    set({ responses: availableResponses });
    get().generateTableData();
  },

  generateTableData: () => {
    const { responses, fields, tab } = get();

    if (responses.length && fields.length) {
      const { tableData, searchData } = processResponsesData(responses, fields);
      set({ tableData, searchData });

      get().filterTableData({ tab: tab || "all" });
    }
  },

  getFieldsColumns: () => {
    return get().filteredFields.map((column, index) => {
      const frozen = index ? {} : { frozen: "left" };

      return {
        title: column.label,
        dataKey: column.id,
        key: column.id,
        width: index ? 200 : 150,
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

  updateResponseStatus: async (responseIds, status) => {
    const { responses, formId, loadFormResponses } = get();

    responseIds.forEach(async (responseId) => {
      const response = responses.find(
        (response) => response.id.value === responseId
      ) as FormValuesProps;

      response.status = {
        value: status,
        id: "status",
      };

      await updateResponse(formId, responseId, response);
    });

    loadFormResponses(formId);
  },

  updateResponseNote: async (notes, id) => {
    const { responses, formId } = get();

    const response = responses.find(
      (resp) => resp.id.value === id
    ) as FormValuesProps;

    response.notes = {
      id: "notes",
      value: notes,
    };

    updateResponse(formId, id, response);
  },

  resetSortBy: () => set(() => ({ sortBy: INITIAL_STATE.sortBy })),

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
