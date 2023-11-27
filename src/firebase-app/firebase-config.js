import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDxXwXb4dyhyvT3rIIP7AMIJn4_cPAlQII",
  authDomain: "wedding-app-d406b.firebaseapp.com",
  projectId: "wedding-app-d406b",
  storageBucket: "wedding-app-d406b.appspot.com",
  messagingSenderId: "746023442175",
  appId: "1:746023442175:web:4351d291c1bf2a0582deca",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
