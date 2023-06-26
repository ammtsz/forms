import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from '../../firebase'
import { FormProps } from "../../../store/formsManagement/types"

export const postForm = async (form: FormProps, docId: string) => {
    await setDoc(doc(firestore, "forms", docId), form)
}

export const getForms = async () => {

    const formsRef = collection(firestore, "forms")
    const querySnapshot = await getDocs(formsRef);

    return querySnapshot.docs.map(doc => doc.data()) as FormProps[]
}