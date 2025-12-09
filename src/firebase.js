// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ import storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxEgX6Melr-9K0JIysXrZpK2-7XBphym8",
  authDomain: "food-order-app-514ba.firebaseapp.com",
  projectId: "food-order-app-514ba",
  storageBucket: "food-order-app-514ba.appspot.com", // ✅ corrected
  messagingSenderId: "133417070586",
  appId: "1:133417070586:web:9c17b4fa7870fe1782be43",
  measurementId: "G-VNERV77HF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ export storage
