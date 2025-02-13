// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvvTezPulvX36VTpWl2kly0Xbe8MKB47I",
  authDomain: "client-side-a29d9.firebaseapp.com",
  projectId: "client-side-a29d9",
  storageBucket: "client-side-a29d9.firebasestorage.app",
  messagingSenderId: "846422238353",
  appId: "1:846422238353:web:b75e45610767f81aaa8b30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);