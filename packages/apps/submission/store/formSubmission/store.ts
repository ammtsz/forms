import { getForm as getFormFromDb, postForm } from "@/api/services/forms";
import { create } from "zustand";

import { FieldProps } from "@forms/types/interfaces/field";

import { FormSubmissionState, FormSubmissionStore } from "./types";

const INITIAL_STATE: FormSubmissionState = {
  isLoading: false,
  errors: null,
  formId: "",
  fields: [],
  title: "",
  description: "",
};

const store = create<FormSubmissionStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  formId: INITIAL_STATE.formId,
  title: INITIAL_STATE.title,
  description: INITIAL_STATE.description,

  getForm: async (id: string) => {
    const dbForm = await getFormFromDb(id);
    get().setForm(dbForm);

    return dbForm;
  },

  setForm: (form) => {
    set(() => ({
      fields: form.fields,
      title: form.title,
      description: form.description,
      formId: form.id,
    }));
  },

  updateFieldValue: (fieldId, fieldValue) => {
    const fields = get().fields;

    set(() => ({
      fields: fields.map((field) =>
        field.id === fieldId ? { ...field, value: fieldValue } : field
      ),
    }));
  },

  setFieldsInitialValues: (initialValues) => {
    get().fields.forEach((field) =>
      get().updateFieldValue(field.id, initialValues[field.id].value)
    );
  },

  getField: (fieldId) =>
    get().fields.find((field) => field.id === fieldId) as FieldProps,

  submitForm: async (formResponse) => {
    const { formId } = get();
    await postForm(formResponse, formResponse.id.value, formId);
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
