import { firestore } from "@app/api/firebase";
import { FormProps } from "@forms/types/interfaces/form";
import { collection, getDocs } from "firebase/firestore";

export const getForms = async () => {
  try {
    const formsRef = collection(firestore, "forms");
    const querySnapshot = await getDocs(formsRef);
    console.error("firebase | container | getForms");

    return querySnapshot.docs.map((doc) => doc.data()) as FormProps[];
  } catch (err) {
    console.error(err);

    return [] as FormProps[];
  }
};
