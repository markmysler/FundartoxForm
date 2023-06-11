import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase.js";
import {
	deleteLocalSaves,
	getLocalSaves,
	saveLocal,
} from "../../handleLocalStorage.js";
import "./UserForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createEntryObject } from "../../createFormObject.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

export function UserForm() {
	const [user] = useAuthState(auth);
	const [localData, setLocalData] = useState(getLocalSaves());

	const handleLogout = () => {
		signOut(auth);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const objNota = createEntryObject();
		if (objNota !== false) {
			try {
				const postDocRef = await addDoc(
					collection(db, "entries"),
					objNota
				);
				await addDoc(collection(db, `users/${user.uid}/entries`), {
					id: postDocRef.id,
				});

				toast.success("Formulario enviado a DB");
			} catch (error) {
				toast.error("Error enviando formulario, intente mas tarde");
				console.log(error);
				toast.info("Guardando informacion localmente");
				saveLocal(objNota);
				toast.info(
					"Informacion guardada localmente, intente subirla a DB mas tarde usando el boton"
				);
				setLocalData(getLocalSaves());
			}
		} else {
			toast.error("Asegurese de llenar todos los campos antes de enviar");
		}
	};

	const form = document.getElementById("user-form");

	form.onsubmit = (e) => {
		handleSubmit(e);
	};

	async function handleLocalDataTransfer() {
		let localSaves = getLocalSaves();
		for (let i = 0; i < localSaves.length; i++) {
			try {
				await addDoc(collection(db, "entries"), {
					...localSaves[i][1],
				});
			} catch (error) {
				toast.error("DB no disponible, intente mas tarde");
				return;
			}
			toast.success("Datos locales cargados a DB");
			deleteLocalSaves();
			toast.success("Datos locales borrados");
			setLocalData(getLocalSaves());
		}
	}

	return (
		<>
			<div>Hola {user.displayName}</div>
			<button onClick={handleLogout}>Cerrar sesion</button>
			{localData.length > 0 && (
				<button onClick={handleLocalDataTransfer}>
					Cargar datos locales a DB
				</button>
			)}

			<ToastContainer />
		</>
	);
}

export default UserForm;
