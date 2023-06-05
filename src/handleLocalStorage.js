function saveLocal(object) {
	let existing = Object.entries(localStorage);
	let RESArr = existing.filter((item) => item[0].split("_")[0] === "RES");
	window.localStorage.setItem(
		`RES_${RESArr.length + 1}`,
		JSON.stringify(object)
	);
}

function getLocalSaves() {
	let existing = Object.entries(localStorage);
	let RESArr = existing.filter((item) => item[0].split("_")[0] === "RES");
	for (let i = 0; i < RESArr.length; i++) {
		RESArr[i][1] = JSON.parse(RESArr[i][1]);
	}
	return RESArr;
}

function deleteLocalSaves() {
	let existing = Object.entries(localStorage);
	let RESArr = existing.filter((item) => item[0].split("_")[0] === "RES");

	for (let i = 1; i <= RESArr.length; i++) {
		localStorage.removeItem(`RES_${i}`);
	}
}

export { saveLocal, getLocalSaves, deleteLocalSaves };
