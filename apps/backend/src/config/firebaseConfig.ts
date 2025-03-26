import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
	process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
	process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}

//export * from "@repo/shared/constants/firebase";
//cant get it to work with firebase functions

const app = initializeApp({
	credential: applicationDefault(),
});

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
