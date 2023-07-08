import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { firestore } from "@app/api/firebase";

export const getFormResponses = async (formId: string) => {
  try {
    const formResponseRef = collection(firestore, formId);
    const querySnapshot = await getDocs(formResponseRef);

    console.log("fireabase | view | getFormResponses");

    return querySnapshot.docs.map((doc) => doc.data()) as FormValuesProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getForm = async (id: string) => {
  try {
    const form = (
      await getDoc(doc(firestore, "forms", id.trim()))
    ).data() as FormProps;

    console.log("fireabase | view | getForm");

    return form;
  } catch (error) {
    console.error(error);
    return {} as FormProps;
  }
};

export const updateResponse = async (
  formId: string,
  responseId: string,
  response: FormValuesProps
) => {
  try {
    await setDoc(doc(firestore, formId.trim(), responseId.trim()), response);

    console.log("fireabase | view | updateResponse");
  } catch (error) {
    console.error(error);
  }
};
