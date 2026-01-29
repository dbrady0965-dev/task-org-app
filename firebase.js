// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_O0mMCBlt2cQSGzIvbwyNa8rOgcSfXZY",
  authDomain: "task-org-app.firebaseapp.com",
  projectId: "task-org-app",
  storageBucket: "task-org-app.firebasestorage.app",
  messagingSenderId: "637908316939",
  appId: "1:637908316939:web:93154195f206dd38b3a80e",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);