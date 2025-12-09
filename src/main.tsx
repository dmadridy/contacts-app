import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";

import router from "@/router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { userStore } from "./lib/store/user";

const firebaseConfig = {
  apiKey: "AIzaSyAI9U5G2MeUYs1_WzECy5kChJUfjx1ZnEw",
  authDomain: "contacts-app-a442f.firebaseapp.com",
  projectId: "contacts-app-a442f",
  storageBucket: "contacts-app-a442f.firebasestorage.app",
  messagingSenderId: "272636938220",
  appId: "1:272636938220:web:ad83815cd4d52893aba2c9",
  measurementId: "G-9416P7JMT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore with local cache persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
// Initialize Auth
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  userStore.setState({ user });
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster closeButton richColors position="top-right" />
    <RouterProvider router={router} />
  </StrictMode>,
);

export { app, db, auth };
