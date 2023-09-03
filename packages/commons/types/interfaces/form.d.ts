import { FieldProps } from './field'

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
  description?: string;
  lng?: string;
}
