// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxEgX6Melr-9K0JIysXrZpK2-7XBphym8",
  authDomain: "food-order-app-514ba.firebaseapp.com",
  projectId: "food-order-app-514ba",
  storageBucket: "food-order-app-514ba.firebasestorage.app",
  messagingSenderId: "133417070586",
  appId: "1:133417070586:web:9c17b4fa7870fe1782be43",
  measurementId: "G-VNERV77HF5"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db= getFirestore(app);
export const auth = getAuth(app);