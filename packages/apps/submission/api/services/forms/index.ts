import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { firestore } from "@api/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const postForm = async (
  form: FormValuesProps,
  responseId: string,
  formId: string
) => {
  try {
    await setDoc(doc(firestore, formId, responseId), form);

    console.log("firebase | submission | postForms");
  } catch (error) {
    console.error(error);
  }
};

export const getForm = async (id: string) => {
  try {
    const form = (
      await getDoc(doc(firestore, "forms", id.trim()))
    ).data() as FormProps;
    console.log("firebase | submission | getForm");

    return form;
  } catch (error) {
    console.error(error);

    return {} as FormProps;
  }
};
