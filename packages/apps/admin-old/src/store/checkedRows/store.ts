import { create } from "zustand";

import { CheckedRowsState, CheckedRowsStore } from "./types";

const INITIAL_STATE: CheckedRowsState = {
  checkedRows: [],
  totalRows: 0,
};

const store = create<CheckedRowsStore>((set, get) => ({
  checkedRows: INITIAL_STATE.checkedRows,
  totalRows: INITIAL_STATE.totalRows,

  setTotalRows: (totalRows: number) => set(() => ({ totalRows })),

  isRowChecked: (id: string): boolean => {
    const { checkedRows } = get();

    return checkedRows.some((rowId: string) => rowId === id);
  },

  isAllChecked: (): boolean => {
    const { checkedRows, totalRows } = get();

    return totalRows > 0 && checkedRows.length === totalRows;
  },

  isIndeterminate: (): boolean => {
    const { checkedRows, isAllChecked } = get();

    return checkedRows.length > 0 && !isAllChecked();
  },

  checkRow: (id: string): void => {
    const { checkedRows } = get();

    set(() => ({ checkedRows: [...checkedRows, id] }));
  },

  uncheckRow: (id: string): void => {
    const { checkedRows } = get();

    const filteredCheckedRows = checkedRows.filter(
      (rowId: string) => rowId !== id
    );

    set(() => ({ checkedRows: [...filteredCheckedRows] }));
  },

  toggleCheckState: (id: string): void => {
    const { isRowChecked: isChecked, uncheckRow, checkRow } = get();

    const toggleState = isChecked(id) ? uncheckRow : checkRow;

    toggleState(id);
  },

  toggleAllCheckStates: (ids: string[]): void => {
    const { isAllChecked, clearCheckedRows } = get();

    isAllChecked() ? clearCheckedRows() : set(() => ({ checkedRows: ids }));
  },

  clearCheckedRows: () => {
    set(() => ({ checkedRows: INITIAL_STATE.checkedRows }));
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
