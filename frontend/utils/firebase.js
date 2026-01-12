// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "foodd-48ad3.firebaseapp.com",
    projectId: "foodd-48ad3",
    storageBucket: "foodd-48ad3.firebasestorage.app",
    messagingSenderId: "40054096820",
    appId: "1:40054096820:web:2ce304ecd8481d45d128e1",
    measurementId: "G-8CLRF8SYES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }