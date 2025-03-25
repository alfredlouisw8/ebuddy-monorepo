import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import {
	FIRESTORE_EMULATOR_HOST,
	FIREBASE_AUTH_EMULATOR_HOST,
} from "@repo/shared/constants/firebase";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
	process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
	process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
}

const app = initializeApp({
	credential: applicationDefault(),
});

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
