// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDqbcGmBCLau4ixWWYwsrq_49K7izMIqM",
  authDomain: "fi-nance-tracker.firebaseapp.com",
  projectId: "fi-nance-tracker",
  storageBucket: "fi-nance-tracker.appspot.com",
  messagingSenderId: "327919602006",
  appId: "1:327919602006:web:7ef0fb3a2d124cec7b6ef7",
  measurementId: "G-Y0C2LB44ZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
