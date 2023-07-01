import { shallow } from "zustand/shallow";

import store from "./store";
import { FormViewStore as Store } from "./types";

export const useFormView = (): Store => {
  return store((state) => state, shallow);
};
