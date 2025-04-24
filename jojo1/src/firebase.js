import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCR_u9pqTXzM0v6qu8zaIpKx39RIWPn6Vs",
    authDomain: "habit-tracker-ebdca.firebaseapp.com",
    projectId: "habit-tracker-ebdca",
    storageBucket: "habit-tracker-ebdca.firebasestorage.app",
    messagingSenderId: "734622569592",
    appId: "1:734622569592:web:a6d30ad91568725aa2098d"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
