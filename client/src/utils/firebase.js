import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8be75.firebaseapp.com",
  projectId: "mern-estate-8be75",
  storageBucket: "mern-estate-8be75.appspot.com",
  messagingSenderId: "899693351338",
  appId: "1:899693351338:web:7d93cadf7a593c5c201bd3"
};
export const app = initializeApp(firebaseConfig);