import { FieldProps } from "@forms/types/interfaces/field";
import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse"

export interface FormSubmissionState {
  isLoading: boolean
  errors: string[] | null
  formType: string
  id: string
  fields: FieldProps[]
  title: string
}

export interface FormSubmissionStore extends FormSubmissionState {
  getForm: (id: string) => Promise<FormProps>
  setForm: (form: FormProps) => void
  updateFieldValue: (fieldId: string, fieldValue: string) => void
  setFieldsInitialValues: (intialValues: FormValuesProps) => void
  getField: (fieldId: string) => FieldProps
  submitForm: (formResponse: FormValuesProps) => Promise<void>
  reset: () => void
}
