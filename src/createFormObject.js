export function createEntryObject() {
	const form = document.getElementById("user-form");

	let IDArray = [];

	for (let i = 0; i < form.length - 1; i++) {
		IDArray.push(form[i].id);
	}
	console.log(IDArray);

	let objEntry = {};

	// Recuperamos los valores de los campos del formulario
	for (let i = 0; i < IDArray.length; i++) {
		const newElement = document.getElementById(IDArray[i]);
		console.log(newElement.value);
		if (newElement.value === "") {
			return false;
		}
		objEntry[IDArray[i]] = [
			newElement.labels[0].innerText,
			newElement.value,
		];
		// Limpiamos los campos del formulario
		document.getElementById(IDArray[i]).value = "";
	}
	return objEntry;
}
