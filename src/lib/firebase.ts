import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

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

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Auth Providers
const githubProvider = new GithubAuthProvider();

export { app, db, auth, githubProvider, analytics };
