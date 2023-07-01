import { firestore } from "@app/api/firebase";
import { FormProps } from "@forms/types/interfaces/form";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const postForm = async (form: FormProps, docId: string) => {
  try {
    await setDoc(doc(firestore, "forms", docId), form);
    console.log("fireabase | creation | postForm");
  } catch (error) {
    console.error(error);
  }
};

export const getForms = async () => {
  try {
    const formsRef = collection(firestore, "forms");
    const querySnapshot = await getDocs(formsRef);

    console.log("fireabase | creation | getForms");

    return querySnapshot.docs.map((doc) => doc.data()) as FormProps[];
  } catch (error) {
    console.error(error);

    return [] as FormProps[];
  }
};
