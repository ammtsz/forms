import { shallow } from "zustand/shallow";

import store from "./store";
import { FormsManagementStore as Store } from "./types";

export const useFormsManagement = (): Store => {
  return store((state) => state, shallow);
};
