import { firestore } from "@api/firebase";
import { User } from "@types";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const registerUser = async (user: User) => {
  try {
    await setDoc(doc(firestore, "users", user.id), user);
  } catch (error) {
    return error;
  }
};

export const getUser = async (email: string) => {
  try {
    const user = (await getDoc(doc(firestore, "users", email))).data();
    return user;
  } catch (error) {
    return { error };
  }
};

export const updateUserForms = async (email: string, forms: string[]) => {
  try {
    await setDoc(doc(firestore, "users", email), { forms }, { merge: true });
  } catch (error) {
    return error;
  }
};
