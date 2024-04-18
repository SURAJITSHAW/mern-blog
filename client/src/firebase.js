// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-79bfb.firebaseapp.com",
    projectId: "mern-blog-79bfb",
    storageBucket: "mern-blog-79bfb.appspot.com",
    messagingSenderId: "391791850907",
    appId: "1:391791850907:web:b7caa47b189f9134641d3e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);