import { doc, getDoc, setDoc } from "firebase/firestore";

import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { firestore } from "@app/api/firebase";

export const postForm = async (
  form: FormValuesProps,
  responseId: string,
  formId: string
) => {
  try {
    await setDoc(doc(firestore, formId, responseId), form);
  } catch (error) {
    console.error(error);
  }
};

export const getForm = async (id: string) => {
  try {
    const form = (
      await getDoc(doc(firestore, "forms", id.trim()))
    ).data() as FormProps;

    return form;
  } catch (error) {
    console.error(error);

    return {} as FormProps;
  }
};
