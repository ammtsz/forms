import { Fields } from "../../utils/src/constants/fields";

export type FieldsType = ConstantValues<typeof Fields>;

export type FieldProps = TextFormProps | OptionsFormProps

export type FieldErrors = { [key: string]: string[] };

export interface OptionsFormProps extends TextFormProps {
    options: OptionProps[]
    optionOther: OptionOtherProps
}

export interface OptionProps {
    label: string
    value: string
}  

export interface OptionOtherProps {
  isVisible: boolean
  placeholder: string
}

export interface TextFormProps {
  id: string
  label: string
  type: FieldsType
  isRequired?: boolean
  placeholder?: string
  value?: string
  dependsOn?: DependsOnProps
  description?: string
  max?: string
  min?: string
}

export interface DependsOnProps {
  fieldId: string
  optionsId: string[]
}
