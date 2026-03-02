import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBZvMWK-BPpsWkl58N6tI-gJ57nJeo9qg",
  authDomain: "archon-2026.firebaseapp.com",
  projectId: "archon-2026",
  storageBucket: "archon-2026.firebasestorage.app",
  messagingSenderId: "26608338287",
  appId: "1:26608338287:web:1c9cf856d4351caa0c549a",
  measurementId: "G-VVNRQLCMZJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
