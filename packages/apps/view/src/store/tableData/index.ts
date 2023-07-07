import { shallow } from "zustand/shallow";

import store from "./store";
import { TableDataStore as Store } from "./types";

export const useTableData = (): Store => {
  return store((state) => state, shallow);
};
