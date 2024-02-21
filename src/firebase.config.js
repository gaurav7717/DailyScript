// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSLHkW-a9aG3lJ_b30EfEaEQ_F6EeEeLo",
  authDomain: "todo-16574.firebaseapp.com",
  projectId: "todo-16574",
  storageBucket: "todo-16574.appspot.com",
  messagingSenderId: "908395875289",
  appId: "1:908395875289:web:bbda9e81fa3019046a27c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);