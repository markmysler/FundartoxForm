import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase.js"; // Import your Firestore instance
import {
	deleteLocalSaves,
	getLocalSaves,
	saveLocal,
} from "../handleLocalStorage.js";
import "./UserForm.css";

export function UserForm() {
	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [age, setAge] = useState("");
	const [localData, setLocalData] = useState(getLocalSaves());

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "fullname") {
			setFullname(value);
		} else if (name === "age") {
			setAge(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, "entries"), {
				fullname: fullname,
				email: email,
				age: age,
			});
			setEmail("");
			setFullname("");
			setAge(0);
		} catch (error) {
			console.error("Error adding user:", error);
			console.log("Saving data to localStorage");
			saveLocal({
				fullname: fullname,
				email: email,
				age: age,
			});
			console.log(
				"Data saved locally, press the Send Data To DB button when connection is restored to upload it"
			);
			setEmail("");
			setFullname("");
			setAge(0);
			setLocalData(getLocalSaves());
		}
	};

	async function handleLocalDataTransfer() {
		let localSaves = getLocalSaves();
		for (let i = 0; i < localSaves.length; i++) {
			try {
				await addDoc(collection(db, "entries"), {
					...localSaves[i][1],
				});
			} catch (error) {
				console.error("handleLocalDataTransfer error ", error);
				return;
			}
			console.log("Upload successful, deleting local data");
			deleteLocalSaves();
			console.log("Local data deleted");
			setLocalData(getLocalSaves());
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="fullname"
					placeholder="Full name"
					value={fullname}
					onChange={handleInputChange}
					className="la"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={handleInputChange}
					className="la"
				/>
				<input
					type="number"
					name="age"
					placeholder="Age"
					value={age}
					onChange={handleInputChange}
					className="la"
				/>

				<button type="submit">Submit</button>
			</form>
			{localData.length > 0 && (
				<button onClick={handleLocalDataTransfer}>
					Send local data to db
				</button>
			)}
		</>
	);
}

export default UserForm;
