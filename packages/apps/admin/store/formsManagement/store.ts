import { create } from "zustand";

import { getForms as getFormsFromDb } from "@/api/services/forms";

import { FormsManagementState, FormsManagementStore } from "./types";

const INITIAL_STATE: FormsManagementState = {
  isLoading: false,
  errors: null,
  forms: [],
};

const store = create<FormsManagementStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  forms: INITIAL_STATE.forms,

  getForms: async () => {
    if (get().forms.length) return get().forms;

    const forms = await getFormsFromDb();
    set({ forms });

    return forms;
  },

  getFormsNamesAndIds: () => {
    return get().forms.map((form) => ({
      title: form.title as string,
      id: form.id as string,
    }));
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
