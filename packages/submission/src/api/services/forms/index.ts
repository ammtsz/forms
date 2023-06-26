import { doc, getDoc, setDoc } from "firebase/firestore";
import { FormProps, FormResponse } from "../../../store/formSubmission/types"
import { firestore } from '../../firebase'

export const postForm = async (form: FormResponse, formId:string , formType: string) => {
    await setDoc(doc(firestore, formType, formId), form)
}

export const getForm = async (id: string) => {
    const form = (await getDoc(doc(firestore, "forms", id.trim()))).data() as FormProps
    return form
}