import { getForm as getFormFromDb, postForm } from "@/api/services/forms";
import { create } from "zustand";

import { FieldProps } from "@forms/types/interfaces/field";

import { FormSubmissionState, FormSubmissionStore } from "./types";
import { getFieldVisibility, setForm } from "./utils";

const INITIAL_STATE: FormSubmissionState = {
  isLoading: false,
  errors: [],
  formId: "",
  fields: [],
  title: "",
  dependencies: {},
  description: "",
  visibleFields: {},
};

const store = create<FormSubmissionStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  formId: INITIAL_STATE.formId,
  title: INITIAL_STATE.title,
  dependencies: INITIAL_STATE.dependencies,
  description: INITIAL_STATE.description,
  visibleFields: INITIAL_STATE.visibleFields,

  getForm: async (id: string) => {
    const dbForm = await getFormFromDb(id);

    if (dbForm) {
      get().setForm(dbForm);
    }

    return dbForm;
  },

  setForm: (form) => {
    const { dependencies, visibleFields } = setForm(form);

    set(() => ({
      fields: form.fields,
      title: form.title,
      description: form.description,
      formId: form.id,
      dependencies,
      visibleFields,
    }));
  },

  updateFieldValue: (fieldId, fieldValue) => {
    const fields = get().fields;

    set(() => ({
      fields: fields.map((field) =>
        field.id === fieldId ? { ...field, value: fieldValue } : field
      ),
    }));

    if (get().dependencies[fieldId]) {
      get().setVisibleFields(fieldId);
    }
  },

  setVisibleFields: (updatedFieldId) => {
    const { dependencies, getField } = get();

    const updatedField = getField(updatedFieldId);
    const dependableFields = dependencies[updatedField.id];

    if (dependableFields) {
      dependableFields.forEach((fieldId) => {
        const dependableField = getField(fieldId);

        const isVisible = getFieldVisibility(updatedField, dependableField);

        set(({ visibleFields }) => ({
          visibleFields: {
            ...visibleFields,
            [fieldId]: isVisible,
          },
        }));
      });
    }
  },

  isFieldVisible: (fieldId) => get().visibleFields[fieldId],

  setFieldsInitialValues: (initialValues) => {
    get().fields.forEach((field) =>
      get().updateFieldValue(field.id, initialValues[field.id].value)
    );
  },

  setErrors: (errors) => {
    set(() => ({ errors }));
  },

  validateField: (fieldId) => {
    return get().errors.includes(fieldId);
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
