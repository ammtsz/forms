import { Fields } from "../../utils/src/constants/fields";

export type FieldsType = ConstantValues<typeof Fields>;

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
  type: FieldsType
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
