type OptionsType = "select" | "radio" | "checkboxes";
type BasicType = "text" | "textarea" | "switch" | "checkbox";
type DateType = "date";

export type FieldsType = BasicType | OptionsType | DateType;

export type FieldProps = FieldBase & (BasicField | OptionsField | DateField);

export interface BasicFieldProps extends BasicField, FieldBase {};
export interface DateFieldProps extends DateField, FieldBase {};
export interface OptionsFieldProps extends OptionsField, FieldBase {};

interface DateField {
  type: DateType
  max?: string
  min?: string
}

interface OptionsField {
  type: OptionsType
  options?: OptionProps[]
  optionOther?: OptionOtherProps
}

interface BasicField {
  type: BasicType;
}

interface FieldBase {
  id: string
  label: string
  isRequired?: boolean
  placeholder?: string
  dependsOn?: DependsOnProps
  description?: string
  value?: string
}

export type FieldErrors = { [key: string]: string[] };

export interface OptionProps {
    label: string
    value: string
}  

export interface OptionOtherProps {
  isVisible: boolean
  placeholder: string
}

export interface DependsOnProps {
  fieldId: string
  optionsValues: string[]
}