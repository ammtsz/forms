import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { firestore } from '../../firebase'
import { FormValuesProps, FormProps } from "@container/types"

export const getFormResponses = async (formId: string) => {
    const formResponseRef = collection(firestore, formId)
    const querySnapshot = await getDocs(formResponseRef);

    return querySnapshot.docs.map(doc => doc.data()) as FormValuesProps[]
}

export const getForm = async (id: string) => {
    const form = (await getDoc(doc(firestore, "forms", id.trim()))).data() as FormProps
    
    return form
}