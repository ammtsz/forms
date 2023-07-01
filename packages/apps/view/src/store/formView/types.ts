import { FieldProps } from "@forms/types/interfaces/field";
import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

export interface FormViewState {
  isLoading: boolean;
  errors: string[] | null;
  id: string;
  title: string;
  fields: FieldProps[];
  responses: FormValuesProps[];
}

export interface FormViewStore extends FormViewState {
  getFormResponses: (formId: string) => Promise<FormValuesProps[]>;
  getForm: (formId: string) => Promise<FormProps>;
  reset: () => void;
}
