import { TextFormProps, OptionsFormProps } from "../../types/formCreation.types"

export type FieldProps = TextFormProps | OptionsFormProps

export interface FieldResponse {
  id: string
  value?: string
}

export interface FormResponse {
  [key: string]: FieldResponse
}

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
}

export interface FormViewState {
  isLoading: boolean
  errors: string[] | null
  id: string
  title: string
  fields: FieldProps[]
  responses: FormResponse[]
}

export interface FormViewStore extends FormViewState {
  getFormResponses: (formId: string) => Promise<FormResponse[]>
  getForm: (formId: string) => Promise<FormProps>
  reset: () => void
}
