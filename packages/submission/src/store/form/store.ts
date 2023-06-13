import { create } from 'zustand'

import { FormState, FormStore, FieldsProps, FieldProps } from './types'
import { FormValuesProps } from "../../types/form.types"

const INITIAL_STATE: FormState = {
  isLoading: false,
  errors: null,
  fields: {},
  fieldsIds: [],
}

const store = create<FormStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  fields: INITIAL_STATE.fields,
  fieldsIds: INITIAL_STATE.fieldsIds,

  setFields: (fields: FieldsProps) => {
    set(() => ({ fields }))
    get().setFieldsKeys()
  },
  
  setFieldsKeys: () => set(({fields}) => ({
    fieldsIds: Object.keys(fields)
  })),

  setFieldValue: (fieldId: string, fieldValue: string) => {
    set(({ fields }) => ({
      fields: {
        ...fields,
        [fieldId]: {
          ...fields[fieldId],
          value: fieldValue
        }
      }
    }))
  },

  setFieldsInitialValues: (initialValues: FormValuesProps) => {
    Object.keys(initialValues).forEach(
      (fieldId) => get().setFieldValue(fieldId, initialValues[fieldId].value)
    )
    
  },

  getField: (fieldId: string): FieldProps => get().fields[fieldId],

  reset: () => set(state => ({ ...state, ...INITIAL_STATE }))
}))

export default store
