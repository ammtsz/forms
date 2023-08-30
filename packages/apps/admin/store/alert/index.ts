import { shallow } from "zustand/shallow";

import store from "./store";
import { AlertStore as Store } from "./types";

export const useAlert = (): Store => {
  return store((state) => state, shallow);
};
