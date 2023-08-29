import { create } from "zustand";

import {
  getForms as getFormsFromDb,
  deleteForm,
} from "@app/api/services/forms";
import { updateUserForms } from "@app/api/services/user";

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

  getForms: async (formsIds) => {
    if (get().forms.length) return get().forms;

    const forms = await getFormsFromDb(formsIds);
    set({ forms });

    return forms;
  },

  getFormsNamesAndIds: () => {
    return get().forms.map((form) => ({
      title: form.title as string,
      id: form.id as string,
    }));
  },

  updateForms: (newForm) => {
    const existingForm = get().forms.find(({ id }) => id === newForm.id);
    if (existingForm) {
      set(({ forms }) => ({
        forms: forms.map((form) => {
          if (newForm.id === form.id) {
            return newForm;
          }
          return form;
        }),
      }));
    } else {
      set(({ forms }) => ({ forms: [...forms, newForm] }));
    }
  },

  deleteForm: async (formId, email) => {
    const error = await deleteForm(formId);

    if (error) {
      return { hasError: true };
    }

    const formsIds = get()
      .forms.filter((form) => form.id !== formId)
      .map((form) => form.id);

    const hasError = !!(await updateUserForms(email, formsIds));

    set(({ forms }) => ({
      forms: forms.filter((form) => form.id !== formId),
    }));

    return { hasError };
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
