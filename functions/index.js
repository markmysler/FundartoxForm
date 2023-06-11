"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDocument = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
	await db
		.collection("users")
		.doc(user.uid)
		.set(JSON.parse(JSON.stringify(user)));
});

//# sourceMappingURL=index.js.map
