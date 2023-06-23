import { TextFormProps, OptionsFormProps, FormValuesProps } from "../../types/form.types"

export type FieldProps = TextFormProps | OptionsFormProps

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
}

export interface FieldResponse {
  id: string
  value?: string
}

export interface FormResponse {
  [key: string]: FieldResponse
}  

export interface FormState {
  isLoading: boolean
  errors: string[] | null
  formType: string
  id: string
  fields: FieldProps[]
  title: string
}

export interface FormStore extends FormState {
  getForm: (id: string) => Promise<FormProps>
  setForm: (form: FormProps) => void
  updateFieldValue: (fieldId: string, fieldValue: string) => void
  setFieldsInitialValues: (intialValues: FormValuesProps) => void
  getField: (fieldId: string) => FieldProps
  submitForm: (formResponse: FormResponse) => Promise<void>
  reset: () => void
}
