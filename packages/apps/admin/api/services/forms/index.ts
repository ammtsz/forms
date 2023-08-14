import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";

import { FormProps } from "@forms/types/interfaces/form";

import { firestore } from "@app/api/firebase";

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

export const getForms = async (formsIds: string[]) => {
  try {
    const formsRef = collection(firestore, "forms");
    const q = query(formsRef, where("__name__", "in", formsIds));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data()) as FormProps[];
  } catch (error) {
    console.error(error);
    return [] as FormProps[];
  }
};

export const postForm = async (form: FormProps, docId: string) => {
  try {
    await setDoc(doc(firestore, "forms", docId), form);
  } catch (error) {
    return error;
  }
};

export const deleteForm = async (formId: string) => {
  try {
    await deleteDoc(doc(firestore, "forms", formId));
  } catch (error) {
    return error;
  }
};
