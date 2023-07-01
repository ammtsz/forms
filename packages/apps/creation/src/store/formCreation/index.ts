import { shallow } from "zustand/shallow";

import store from "./store";
import { FormCreationStore as Store } from "./types";

export const useFormCreation = (): Store => {
  return store((state) => state, shallow);
};
