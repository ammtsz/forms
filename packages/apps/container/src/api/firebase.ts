import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4nXCg8Vzjwm5C-o38MV_hdJBGN7o862Y",
  authDomain: "forms-3e189.firebaseapp.com",
  projectId: "forms-3e189",
  storageBucket: "forms-3e189.appspot.com",
  messagingSenderId: "865865155642",
  appId: "1:865865155642:web:23485ae029941ff8c8e103"
};


export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

