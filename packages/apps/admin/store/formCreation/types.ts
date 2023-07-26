import { FieldProps, FieldErrors } from "@forms/types/interfaces/field";

export interface FormCreationState {
  isLoading: boolean;
  errors: FieldErrors | null;
  title: string;
  description?: string;
  fields: FieldProps[];
  fieldsIds: string[];
}

export interface FormCreationStore extends FormCreationState {
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  addField: (fields: FieldProps) => void;
  deleteField: (fieldId: string) => void;
  updateField: (field: FieldProps) => void;
  getField: (fieldId: string) => FieldProps;
  createForm: () => Promise<{ hasError: boolean }>;
  setErrors: (errors: FieldErrors) => void;
  reset: () => void;
}