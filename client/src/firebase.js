// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e3ca6.firebaseapp.com",
  projectId: "mern-blog-e3ca6",
  storageBucket: "mern-blog-e3ca6.appspot.com",
  messagingSenderId: "141770386168",
  appId: "1:141770386168:web:77a3ec6adfc527e23a690d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);