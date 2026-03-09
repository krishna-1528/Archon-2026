import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDBZvMWK-BPpsWkl58N6tI-gJ57nJeo9qg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "archon-2026.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "archon-2026",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "archon-2026.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "26608338287",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:26608338287:web:1c9cf856d4351caa0c549a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VVNRQLCMZJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
