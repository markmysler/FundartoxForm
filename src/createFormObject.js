export function createEntryObject(IDArray) {
	let objEntry = {};

	// Recuperamos los valores de los campos del formulario
	for (let i = 0; i < IDArray.length; i++) {
		const newElement = document.getElementById(IDArray[i]);
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
