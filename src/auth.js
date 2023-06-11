import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "./firebase";

export const signInWithGoogle = async () => {
	const googleProvider = new GoogleAuthProvider();
	try {
		const res = await signInWithPopup(auth, googleProvider);
	} catch (err) {
		console.error(err);
		alert(err.message);
		return;
	}
};
