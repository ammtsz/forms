import { MakeRequired } from "@forms/types/global/makeRequired";
import {
  FieldErrors,
  FieldProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { isOptionTypeField, isToggleTypeField, uuid } from "@forms/utils";

import { FormCreationState, FormCreationStore } from "./types";
import { postForm } from "@api/services/forms";
import { updateUserForms } from "@api/services/user";
import { create } from "zustand";

const INITIAL_STATE: FormCreationState = {
  isLoading: false,
  errors: null,
  title: "",
  description: "",
  fields: [],
  fieldsIds: [],
  dependsOnOptions: {},
};

const store = create<FormCreationStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  title: INITIAL_STATE.title,
  description: INITIAL_STATE.description,
  fields: INITIAL_STATE.fields,
  fieldsIds: INITIAL_STATE.fieldsIds,
  dependsOnOptions: INITIAL_STATE.dependsOnOptions,

  updateTitle: (title: string) => {
    set({ title });
  },

  updateDescription: (description: string) => {
    set({ description });
  },

  addField: (field: FieldProps) => {
    set(({ fields, fieldsIds }) => ({
      fields: [...fields, field],
      fieldsIds: [...fieldsIds, field.id],
    }));
  },

  deleteField: (fieldId: string) => {
    const { fields, fieldsIds } = get();

    const dependsOnOptions = { ...get().dependsOnOptions };
    delete dependsOnOptions[fieldId];

    set(() => ({
      fields: fields.filter((field) => field.id !== fieldId),
      fieldsIds: fieldsIds.filter((field) => field !== fieldId),
      dependsOnOptions,
    }));
  },

  updateField: (field: FieldProps) => {
    const { fieldsIds } = get();
    const index = get().fieldsIds.indexOf(field.id);
    const fields = [...get().fields];
    fields[index >= 0 ? index : fieldsIds.length] = field;

    set(() => ({ fields }));
    get().setDependsOnOptions(field);
  },

  createUserForm: async (email, forms) => {
    const { fields, title, description } = get();
    const id = uuid();

    let hasError = false;

    hasError = !!(await postForm({ title, id, fields, description }, id));

    if (!hasError) {
      const formsIds = forms ? [...forms, id] : [id];
      hasError = !!(await updateUserForms(email, formsIds));
    }

    return { formId: id, hasError };
  },

  getField: (fieldId: string): FieldProps => {
    const index = get().fieldsIds.indexOf(fieldId);
    return get().fields[index];
  },

  setDependsOnOptions: (field) => {
    const hasOptions =
      isOptionTypeField(field.type) &&
      (field as MakeRequired<OptionsFieldProps, "options">).options[0]?.label;

    if (isToggleTypeField(field.type) || hasOptions) {
      set(({ dependsOnOptions }) => ({
        dependsOnOptions: {
          ...dependsOnOptions,
          [field.id]: {
            id: field.id,
            label: field.label,
            type: field.type,
            options: hasOptions ? (field as OptionsFieldProps).options : [],
          },
        },
      }));
    }
  },

  setErrors: (errors: FieldErrors) => set(() => ({ errors })),

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
