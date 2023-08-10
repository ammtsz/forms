import { FormProps } from "@forms/types/interfaces/form";
import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { firestore } from "@api/firebase";
import { User } from "@types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const getForm = async (id: string) => {
  try {
    const form = (
      await getDoc(doc(firestore, "forms", id.trim()))
    ).data() as FormProps;

    console.log("firebase | admin | getForm");

    return form;
  } catch (error) {
    console.error(error);
    return {} as FormProps;
  }
};

export const getForms = async (formsIds: string[]) => {
  try {
    const formsRef = collection(firestore, "forms");

    const q = query(formsRef, where("__name__", "in", formsIds));

    const querySnapshot = await getDocs(q);

    console.error("firebase | admin | getForms");

    return querySnapshot.docs.map((doc) => doc.data()) as FormProps[];
  } catch (error) {
    console.error(error);

    return [] as FormProps[];
  }
};

export const getFormResponses = async (formId: string) => {
  try {
    const formResponseRef = collection(firestore, formId);
    const querySnapshot = await getDocs(formResponseRef);

    console.log("firebase | admin | getFormResponses");

    return querySnapshot.docs.map((doc) => doc.data()) as FormValuesProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postForm = async (form: FormProps, docId: string) => {
  try {
    await setDoc(doc(firestore, "forms", docId), form);
    console.log("fireabase | admin | postForm");
  } catch (error) {
    return error;
  }
};

export const updateResponse = async (
  formId: string,
  responseId: string,
  response: FormValuesProps
) => {
  try {
    await setDoc(doc(firestore, formId.trim(), responseId.trim()), response);

    console.log("firebase | admin | updateResponse");
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (user: User) => {
  try {
    await setDoc(doc(firestore, "users", user.id), user);

    console.log("fireabase | auth | registerUser");
  } catch (error) {
    return error;
  }
};

export const getUser = async (email: string) => {
  try {
    const user = (await getDoc(doc(firestore, "users", email))).data();
    console.log("firebase | auth | getUser");

    return user;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const updateUserForms = async (email: string, forms: string[]) => {
  try {
    await setDoc(doc(firestore, "users", email), { forms }, { merge: true });
    console.log("firebase | admin | updateUserForms");
  } catch (error) {
    console.error(error);
    return error;
  }
};
