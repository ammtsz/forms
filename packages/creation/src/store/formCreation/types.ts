import { TextFormProps, OptionsFormProps } from "../../types/formCreation.types"

export type FieldProps = TextFormProps | OptionsFormProps
export type FieldsProps = { [key: string]: FieldProps }

export interface FormCreationState {
  isLoading: boolean
  errors: string[] | null
  fields: FieldsProps 
  fieldsIds: string[] 
}

export interface FormCreationStore extends FormCreationState {
  addField: (fields: FieldProps) => void
  deleteField: (fieldId: string) => void
  updateField: (field: FieldProps) => void
  setFieldsKeys: () => void
  getField: (fieldId: string) => FieldProps
  reset: () => void
}
