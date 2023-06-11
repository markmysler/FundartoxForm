import React from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";

export function Welcome() {
	const form = document.getElementById("user-form");
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};
	form.onsubmit = (e) => {
		e.preventDefault();
		toast.error("Ingrese con google para enviar el formulario");
	};
	return (
		<>
			<h1>Bienvenido a Fundartox Form</h1>
			<button onClick={googleSignIn}>Ingresar con google</button>
			<ToastContainer />
		</>
	);
}
