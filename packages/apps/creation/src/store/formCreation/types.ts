import { TextFormProps, OptionsFormProps } from "../../types"

export type FieldProps = TextFormProps | OptionsFormProps

export interface FormCreationState {
  isLoading: boolean
  errors: string[] | null
  title: string
  description?: string
  fields: FieldProps[]
  fieldsIds: string[] 
}

export interface FormCreationStore extends FormCreationState {
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  addField: (fields: FieldProps) => void
  deleteField: (fieldId: string) => void
  updateField: (field: FieldProps) => void
  getField: (fieldId: string) => FieldProps
  createForm: () => Promise<void>
  reset: () => void
}
