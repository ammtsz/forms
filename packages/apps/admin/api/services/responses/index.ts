import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { firestore } from "@api/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const getFormResponses = async (formId: string) => {
  try {
    const formResponseRef = collection(firestore, formId);
    const querySnapshot = await getDocs(formResponseRef);

    return querySnapshot.docs.map((doc) => doc.data()) as FormValuesProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateResponse = async (
  formId: string,
  responseId: string,
  response: FormValuesProps
) => {
  try {
    await setDoc(doc(firestore, formId.trim(), responseId.trim()), response);
  } catch (error) {
    return error;
  }
};
