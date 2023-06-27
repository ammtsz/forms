import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { firestore } from '../../../api/firebase'
import { FormValuesProps, FormProps } from "../../../types"

export const getFormResponses = async (formId: string) => {
    try {
        const formResponseRef = collection(firestore, formId)
        const querySnapshot = await getDocs(formResponseRef)
        
        console.log("fireabase | view | getFormResponses")

        return querySnapshot.docs.map(doc => doc.data()) as FormValuesProps[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getForm = async (id: string) => {
    try {
        const form = (await getDoc(doc(firestore, "forms", id.trim()))).data() as FormProps
        
        console.log("fireabase | view | getForm")
        
        return form
    } catch (error) {
        console.error(error)
        return {} as FormProps
    }
}