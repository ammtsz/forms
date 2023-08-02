import { FieldProps } from "@forms/types/interfaces/field";
import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

export interface FormSubmissionState {
  isLoading: boolean;
  errors: string[] | null;
  formId: string;
  fields: FieldProps[];
  title: string;
  description: string;
}

export interface FormSubmissionStore extends FormSubmissionState {
  getForm: (id: string) => Promise<FormProps>;
  setForm: (form: FormProps) => void;
  updateFieldValue: (fieldId: string, fieldValue: string) => void;
  setFieldsInitialValues: (initialValues: FormValuesProps) => void;
  getField: (fieldId: string) => FieldProps;
  submitForm: (formResponse: FormValuesProps) => Promise<void>;
  reset: () => void;
}
