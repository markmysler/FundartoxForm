import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase.js";
import {
	deleteLocalSaves,
	getLocalSaves,
	saveLocal,
} from "../handleLocalStorage.js";
import "./UserForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UserForm() {
	const form = document.getElementById("user-form");
	let IDArray = [];

	for (let i = 0; i < form.length - 1; i++) {
		IDArray.push(form[i].id);
	}

	const [localData, setLocalData] = useState(getLocalSaves());

	function createEntryObject() {
		let objNota = {};

		// Recuperamos los valores de los campos del formulario
		for (let i = 0; i < IDArray.length; i++) {
			const newElement = document.getElementById(IDArray[i]);
			objNota[IDArray[i]] = [
				newElement.labels[0].innerText,
				newElement.value,
			];
			// Limpiamos los campos del formulario
			document.getElementById(IDArray[i]).value = "";
		}
		return objNota;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const objNota = createEntryObject();
		try {
			await addDoc(collection(db, "entries"), objNota);
			toast.success("Formulario enviado a DB");
		} catch (error) {
			toast.error("Error enviando formulario, intente mas tarde");
			toast.info("Guardando informacion localmente");
			saveLocal(objNota);
			toast.info(
				"Informacion guardada localmente, intente subirla a DB mas tarde usando el boton"
			);
			setLocalData(getLocalSaves());
		}
	};

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
