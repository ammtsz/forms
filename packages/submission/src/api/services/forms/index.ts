import { doc, getDoc, setDoc } from "firebase/firestore";
import { FormProps } from "@container/types"
import { FormValuesProps } from "@app/types"
import { firestore } from '@app/api/firebase'

export const postForm = async (form: FormValuesProps, formId:string , formType: string) => {
    await setDoc(doc(firestore, formType, formId), form)
}

export const getForm = async (id: string) => {
    const form = (await getDoc(doc(firestore, "forms", id.trim()))).data() as FormProps
    return form
}