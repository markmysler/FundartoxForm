// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDu26irtLhRwwamWTAfe3Nt-uvDor0pjRA",
	authDomain: "db-encuesta.firebaseapp.com",
	projectId: "db-encuesta",
	storageBucket: "db-encuesta.appspot.com",
	messagingSenderId: "202523680885",
	appId: "1:202523680885:web:6bd7f56ed3b6d0925d183c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
