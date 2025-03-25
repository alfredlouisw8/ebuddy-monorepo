import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { FIREBASE_AUTH_EMULATOR_HOST } from "@repo/shared/src/constants/firebase";

// Initialize Firebase
const app = initializeApp();
const auth = getAuth(app);

// Connect to emulator in development
if (process.env.NODE_ENV === "development") {
	// Must be called AFTER getAuth() but BEFORE any operations
	connectAuthEmulator(auth, FIREBASE_AUTH_EMULATOR_HOST, {
		disableWarnings: true,
	});
}

export { auth };
export default app;
