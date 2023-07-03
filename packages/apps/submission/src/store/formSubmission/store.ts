import { create } from "zustand";

import { FieldProps } from "@forms/types/interfaces/field";
import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { uuid } from "@forms/utils";

import { getForm as getFormFromDb, postForm } from "@app/api/services/forms";

import { FormSubmissionState, FormSubmissionStore } from "./types";

const INITIAL_STATE: FormSubmissionState = {
  isLoading: false,
  errors: null,
  formType: "",
  id: "",
  fields: [],
  title: "",
};

const store = create<FormSubmissionStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  id: INITIAL_STATE.id,
  formType: INITIAL_STATE.formType,
  title: INITIAL_STATE.title,

  getForm: async (id: string) => {
    const dbForm = await getFormFromDb(id);
    get().setForm(dbForm);

    return dbForm;
  },

  setForm: (form: FormProps) => {
    set(() => ({
      fields: form.fields,
      title: form.title,
      formType: form.id,
    }));
  },

  updateFieldValue: (fieldId: string, fieldValue: string) => {
    const fields = get().fields;

    set(() => ({
      fields: fields.map((field) =>
        field.id === fieldId ? { ...field, value: fieldValue } : field
      ),
    }));
  },

  setFieldsInitialValues: (initialValues: FormValuesProps) => {
    get().fields.forEach((field) =>
      get().updateFieldValue(field.id, initialValues[field.id].value)
    );
  },

  getField: (fieldId: string): FieldProps =>
    get().fields.find((field) => field.id === fieldId) as FieldProps,

  submitForm: async (formResponse) => {
    const { id, formType } = get();
    const formId = id || uuid();
    await postForm(formResponse, formId, formType);
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
