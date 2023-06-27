import { collection, getDocs } from "firebase/firestore";
import { FormProps } from "../../../types"

import { firestore } from '../../../api/firebase'

export const getForms = async () => {
    try {
        const formsRef = collection(firestore, "forms")
        const querySnapshot = await getDocs(formsRef);
        console.error("firebase | container | getForms")
    
        return querySnapshot.docs.map(doc => doc.data()) as FormProps[]
    } catch (err) {
        console.error(err)

        return [] as FormProps[]
    }
}