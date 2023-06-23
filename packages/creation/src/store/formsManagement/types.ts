import { TextFormProps, OptionsFormProps } from "../../types/formCreation.types"

export type FieldProps = TextFormProps | OptionsFormProps

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
}

export interface FormsManagementState {
  isLoading: boolean
  errors: string[] | null
  forms: FormProps[]
}

export interface FormsManagementStore extends FormsManagementState {
  getFormsNamesAndIds: () => {title: string, id: string}[]
  getForms: () => Promise<FormProps[]>
  reset: () => void
}
