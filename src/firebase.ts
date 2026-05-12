import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtW8klnhExj-VAARn6zzEU2njvLTygHdE",
  authDomain: "media-findr.firebaseapp.com",
  projectId: "media-findr",
  storageBucket: "media-findr.firebasestorage.app",
  messagingSenderId: "58909657471",
  appId: "1:58909657471:web:1447bb331820d8cc48324a",
  measurementId: "G-H8EPW29VD0"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
