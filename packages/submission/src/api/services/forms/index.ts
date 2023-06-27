import { doc, getDoc, setDoc } from "firebase/firestore";
import { FormProps } from "../../../types"
import { FormValuesProps } from "../../../types"
import { firestore } from '../../../api/firebase'

export const postForm = async (form: FormValuesProps, formId:string , formType: string) => {
    try {
        await setDoc(doc(firestore, formType, formId), form)
    
        console.log("fireabase | submission | postForms")
    } catch (error) {
        console.error(error)
    }
}

export const getForm = async (id: string) => {
    try {
        const form = (await getDoc(doc(firestore, "forms", id.trim()))).data() as FormProps
        console.log("fireabase | submission | getForm")

        return form
    } catch (error) {
        console.error(error)

        return {} as FormProps
    }
}