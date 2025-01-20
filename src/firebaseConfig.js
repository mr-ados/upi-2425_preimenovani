
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHL4MVgQV9c1wpeCJzoaWQnmMt_YeuzEc",
  authDomain: "menza-e1c57.firebaseapp.com",
  databaseURL: "https://menza-e1c57-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "menza-e1c57",
  storageBucket: "menza-e1c57.firebasestorage.app",
  messagingSenderId: "690344742759",
  appId: "1:690344742759:web:8564e67113814c8cc969c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

export { auth, database };