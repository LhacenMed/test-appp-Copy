import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from "firebase/auth";
// import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD_zssaAnfTzxnVOh_d0QXoNBrtKcML0NA",
  authDomain: "rnauthvideo2.firebaseapp.com",
  projectId: "rnauthvideo2",
  storageBucket: "rnauthvideo2.firebasestorage.app",
  messagingSenderId: "995000915226",
  appId: "1:995000915226:web:a8dc47f841c4aa028088a3",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
