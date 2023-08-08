import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

interface User {
  id: string;
  username: string;
  email: string;
  picture: string;
}

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
