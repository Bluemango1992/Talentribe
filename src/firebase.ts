// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASnII290uTAhc-76Qq1T_uWibHH91uKH0",
  authDomain: "talentribe-5ee32.firebaseapp.com",
  projectId: "talentribe-5ee32",
  storageBucket: "talentribe-5ee32.appspot.com",
  messagingSenderId: "656675442579",
  appId: "1:656675442579:web:1591e87e0578e09a99e266",
  measurementId: "G-Q43TP6FPL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);




