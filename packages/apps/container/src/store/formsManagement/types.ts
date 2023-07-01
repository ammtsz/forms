import { FormProps } from "@forms/types/interfaces/form";

export interface FormsManagementState {
  isLoading: boolean;
  errors: string[] | null;
  forms: FormProps[];
}

export interface FormsManagementStore extends FormsManagementState {
  getFormsNamesAndIds: () => { title: string; id: string }[];
  getForms: () => Promise<FormProps[]>;
  reset: () => void;
}
