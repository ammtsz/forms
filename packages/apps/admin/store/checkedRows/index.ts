import { shallow } from "zustand/shallow";

import store from "./store";
import { CheckedRowsStore as Store } from "./types";

export const useCheckedRows = (): Store => {
  return store((state) => state, shallow);
};
