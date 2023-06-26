export interface TextFormProps {
  id: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  value?: string
  dependsOn?: DependsOnProps
  description?: string
}

export interface DependsOnProps {
  fieldId: string
  optionsId: string[]
}

export interface OptionsFormProps extends TextFormProps {
  options: OptionProps[]
  optionOther: {
      isVisible: boolean
      placeholder: string
  }
}

export interface OptionProps {
  label: string
  value: string
}

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
