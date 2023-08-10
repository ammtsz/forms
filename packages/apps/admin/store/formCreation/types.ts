import {
  FieldProps,
  FieldErrors,
  OptionProps,
  FieldsType,
} from "@forms/types/interfaces/field";

interface DependsOnOptionsProps {
  [fieldId: string]: {
    id: string;
    label: string;
    type: FieldsType;
    options?: OptionProps[];
  };
}
export interface FormCreationState {
  isLoading: boolean;
  errors: FieldErrors | null;
  title: string;
  description?: string;
  fields: FieldProps[];
  fieldsIds: string[];
  dependsOnOptions?: DependsOnOptionsProps;
}

export interface FormCreationStore extends FormCreationState {
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  addField: (field: FieldProps) => void;
  deleteField: (fieldId: string) => void;
  updateField: (field: FieldProps) => void;
  getField: (fieldId: string) => FieldProps;
  createUserForm: (
    email: string,
    forms?: string[]
  ) => Promise<{ formId: string; hasError: boolean }>;
  setDependsOnOptions: (field: FieldProps) => void;
  setErrors: (errors: FieldErrors) => void;
  reset: () => void;
}
