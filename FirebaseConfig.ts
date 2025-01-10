import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANb--HYopJivHp_E93js9Cye8nXHoFInQ",
  authDomain: "market-store-app-mo.firebaseapp.com",
  projectId: "market-store-app-mo",
  storageBucket: "market-store-app-mo.firebasestorage.app",
  messagingSenderId: "202653017008",
  appId: "1:202653017008:web:db9280c4b33f6a3b516c75"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);