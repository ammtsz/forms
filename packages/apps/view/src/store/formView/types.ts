import { FieldProps} from "@forms/types/interfaces/field"
import { FormValuesProps } from "@forms/types/interfaces/formResponse"
import { FormProps } from "@forms/types/interfaces/form"

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
