import { create } from 'zustand'

import { FormCreationState, FormCreationStore, FieldProps } from './types'

const INITIAL_STATE: FormCreationState = {
  isLoading: false,
  errors: null,
  fields: {},
  fieldsIds: [],
}

const store = create<FormCreationStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  fieldsIds: INITIAL_STATE.fieldsIds,

  addField: (field: FieldProps) => {
    set(({ fields }) => ({
      fields: {...fields, [field.id]: {...field} }})
    )
    get().setFieldsKeys()
  },

  deleteField: (fieldId: string) => {
    const fields = get().fields
    delete fields[fieldId]
    
    set(() => ({fields}))
    get().setFieldsKeys()
  },

  updateField: (field: FieldProps) => {
    set(({ fields }) => ({
      fields: {
        ...fields,
        [field.id]: {
          ...fields[field.id],
          ...field
        }
      }})
    )
  },

  setFieldsKeys: () => set(({fields}) => ({
    fieldsIds: Object.keys(fields)
  })),

  getField: (fieldId: string): FieldProps => get().fields[fieldId],

  reset: () => set(state => ({ ...state, ...INITIAL_STATE }))
}))

export default store
