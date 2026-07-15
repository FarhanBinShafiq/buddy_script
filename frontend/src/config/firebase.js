import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDCBhsREP9ozNvHVQoa5f78ttk4n09_110",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "buddy-script-50d85.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "buddy-script-50d85",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "buddy-script-50d85.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "589790930897",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:589790930897:web:afdf016178e3fd9e00a2f0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
