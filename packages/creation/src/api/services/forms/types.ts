import { FieldProps } from "../../../store/formCreation/types";

export interface PostForm {
    id: string
    title: string
    fields: FieldProps[]
}  

export interface FormProps {
  id: string
  title: string
  fields: FieldProps[]
}