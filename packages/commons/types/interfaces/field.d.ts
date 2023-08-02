type OptionsType = "select" | "radio" | "checkboxes";
type BasicType = "text" | "textarea" | "switch" | "checkbox";
type DateType = "date";

export type FieldsType = OptionsType | BasicType | DateType;

export type FieldProps = FormBase & (BasicForm | OptionsForm | DateForm);

export interface DateFormProps extends DateForm, FormBase {};
export interface BasicFormProps extends BasicForm, FormBase {};
export interface OptionsFormProps extends OptionsForm, FormBase {};

interface DateForm {
  type: DateType
  max?: string
  min?: string
}

interface OptionsForm {
  type: OptionsType
  options?: OptionProps[]
  optionOther?: OptionOtherProps
}

interface BasicForm {
  type: BasicType;
}

interface FormBase {
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