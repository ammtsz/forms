import { shallow } from "zustand/shallow";

import store from "./store";
import { FormSubmissionStore as Store } from "./types";

export const useFormSubmission = (): Store => {
  return store((state) => state, shallow);
};
