import { FieldProps, FormValuesProps, FormProps } from "@container/types"

export interface FormViewState {
  isLoading: boolean
  errors: string[] | null
  id: string
  title: string
  fields: FieldProps[]
  responses: FormValuesProps[]
}

export interface FormViewStore extends FormViewState {
  getFormResponses: (formId: string) => Promise<FormValuesProps[]>
  getForm: (formId: string) => Promise<FormProps>
  reset: () => void
}
