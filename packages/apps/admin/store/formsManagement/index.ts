import store from "./store";
import { FormsManagementStore as Store } from "./types";
import { shallow } from "zustand/shallow";

export const useFormsManagement = (): Store => {
  return store((state) => state, shallow);
};
