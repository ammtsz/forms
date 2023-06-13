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
}

export interface OptionProps {
    label: string
    value: string
}

export interface FormValuesProps {
    [key: string]: FormValueProps
}

export interface FormValueProps {
    id: string
    value: string
}

