import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "./firebase";

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
