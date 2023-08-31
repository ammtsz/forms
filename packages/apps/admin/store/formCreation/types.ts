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
  id: string;
  isLoading: boolean;
  errors: FieldErrors | null;
  title: string;
  description?: string;
  fields: FieldProps[];
  fieldsIds: string[];
  dependsOnOptions?: DependsOnOptionsProps;
}

export interface FormCreationStore extends FormCreationState {
  loadForm: (formId: string) => Promise<{ hasError: boolean }>;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  addField: (field: FieldProps) => void;
  addFields: (fields: FieldProps[]) => void;
  deleteField: (fieldId: string) => void;
  updateField: (field: FieldProps) => void;
  getField: (fieldId: string) => FieldProps;
  createUserForm: (
    email: string,
    lang: string,
    forms?: string[]
  ) => Promise<{ formId: string; hasError: boolean }>;
  setDependsOnOptions: (field: FieldProps) => void;
  sortFields: (fieldId: string, newIndex: number) => void;
  setErrors: (errors: FieldErrors) => void;
  reset: () => void;
}
