// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP0o_6GhnD5llnq9rNz2iaWuiNKM8JcQ8",
  authDomain: "contacts-app-4e369.firebaseapp.com",
  projectId: "contacts-app-4e369",
  storageBucket: "contacts-app-4e369.firebasestorage.app",
  messagingSenderId: "831131707340",
  appId: "1:831131707340:web:30c7381b98e819c2095f69",
  measurementId: "G-WFN6EXRLYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
