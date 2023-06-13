import { TextFormProps, OptionsFormProps, FormValuesProps } from "../../types/form.types"

export type FieldProps = TextFormProps | OptionsFormProps
export type FieldsProps = { [key: string]: FieldProps }

export interface FormState {
  isLoading: boolean
  errors: string[] | null
  fields: FieldsProps 
  fieldsIds: string[] 
}

export interface FormStore extends FormState {
  setFields: (fields: FieldsProps) => void
  setFieldsKeys: () => void
  setFieldValue: (fieldId: string, fieldValue: string) => void
  setFieldsInitialValues: (intialValues: FormValuesProps) => void
  getField: (fieldId: string) => FieldProps
  reset: () => void
}
