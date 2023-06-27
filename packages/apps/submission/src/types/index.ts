export interface FormValuesProps {
    [key: string]: FormValueProps
}

export interface FormValueProps {
    id: string
    value: string
}


// TODO: apagar interfaces abaixo
export type FieldProps = TextFormProps | OptionsFormProps

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

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
}