import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";

import router from "@/router";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { RouterProvider } from "react-router-dom";

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
// Initialize Firestore with local cache
initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
// Get Firestore instance
const db = getFirestore(app);
// Initialize Analytics
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

export { app, db, analytics };
