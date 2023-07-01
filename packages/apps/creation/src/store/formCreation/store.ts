import { postForm } from "@app/api/services/forms";
import { FieldProps } from "@forms/types/interfaces/field";
import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { FormCreationState, FormCreationStore } from "./types";

const INITIAL_STATE: FormCreationState = {
  isLoading: false,
  errors: null,
  title: "",
  description: "",
  fields: [],
  fieldsIds: [],
};

const store = create<FormCreationStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  title: INITIAL_STATE.title,
  description: INITIAL_STATE.description,
  fields: INITIAL_STATE.fields,
  fieldsIds: INITIAL_STATE.fieldsIds,

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

    set(() => ({
      fields: fields.filter((field) => field.id !== fieldId),
      fieldsIds: fieldsIds.filter((field) => field !== fieldId),
    }));
  },

  updateField: (field: FieldProps) => {
    const { fieldsIds } = get();
    const index = get().fieldsIds.indexOf(field.id);
    const fields = [...get().fields];
    fields[index >= 0 ? index : fieldsIds.length] = field;

    set(() => ({ fields }));
  },

  createForm: async () => {
    const { fields, title } = get();
    const id = uuid();
    await postForm({ title, id, fields }, id);
  },

  getField: (fieldId: string): FieldProps => {
    const index = get().fieldsIds.indexOf(fieldId);
    return get().fields[index];
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
