// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBM6jcdcYTQYuoY6hcG1P90OWq_RQ8nCdo",
    authDomain: "devclubsuporte.firebaseapp.com",
    projectId: "devclubsuporte",
    storageBucket: "devclubsuporte.firebasestorage.app",
    messagingSenderId: "129519506869",
    appId: "1:129519506869:web:3530b681da2e22a2a0f5fc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };