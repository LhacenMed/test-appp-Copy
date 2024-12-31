// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_zssaAnfTzxnVOh_d0QXoNBrtKcML0NA",
  authDomain: "rnauthvideo2.firebaseapp.com",
  projectId: "rnauthvideo2",
  storageBucket: "rnauthvideo2.firebasestorage.app",
  messagingSenderId: "995000915226",
  appId: "1:995000915226:web:a8dc47f841c4aa028088a3",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
