import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from "firebase/auth";
// import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_zssaAnfTzxnVOh_d0QXoNBrtKcML0NA",
  authDomain: "rnauthvideo2.firebaseapp.com",
  projectId: "rnauthvideo2",
  storageBucket: "rnauthvideo2.firebasestorage.app",
  messagingSenderId: "995000915226",
  appId: "1:995000915226:web:a8dc47f841c4aa028088a3",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export the instances
export { app as FIREBASE_APP, auth as FIREBASE_AUTH, db as FIREBASE_DB };



            // "@react-native-firebase/app",
            // "@react-native-firebase/auth",
            // "@react-native-firebase/perf",
            // "@react-native-firebase/crashlytics"