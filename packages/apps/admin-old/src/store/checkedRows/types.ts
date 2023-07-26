export interface CheckedRowsState {
  checkedRows: string[];
  totalRows: number;
}

export interface CheckedRowsStore extends CheckedRowsState {
  setTotalRows: (totalRows: number) => void;
  isRowChecked: (id: string) => boolean;
  isAllChecked: () => boolean;
  isIndeterminate: () => boolean;
  toggleCheckState: (id: string) => void;
  toggleAllCheckStates: (id: string[]) => void;
  checkRow: (id: string) => void;
  uncheckRow: (id: string) => void;
  clearCheckedRows: () => void;
  reset(): void;
}
