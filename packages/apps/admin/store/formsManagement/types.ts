import { FormProps } from "@forms/types/interfaces/form";

export interface FormsManagementState {
  isLoading: boolean;
  errors: string[] | null;
  forms: FormProps[];
}

export interface FormsManagementStore extends FormsManagementState {
  addCreatedForm: (props: FormProps) => void;
  getFormsNamesAndIds: () => { title: string; id: string }[];
  getForms: (formsIds: string[]) => Promise<FormProps[]>;
  deleteForm: (formId: string, email: string) => Promise<{ hasError: boolean }>;
  reset: () => void;
}
