// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPltJG_ffzYKipTX7fIzfE6Og1EbzkMq0",
  authDomain: "netflix-822c2.firebaseapp.com",
  projectId: "netflix-822c2",
  storageBucket: "netflix-822c2.firebasestorage.app",
  messagingSenderId: "206128012491",
  appId: "1:206128012491:web:cb3f3421c1406e9bac0f4e",
  measurementId: "G-XT1977TSTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();