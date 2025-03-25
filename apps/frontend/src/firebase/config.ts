import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Initialize Firebase
const app = initializeApp();
const auth = getAuth(app);

// Connect to emulator in development
if (process.env.NODE_ENV === "development") {
	// Must be called AFTER getAuth() but BEFORE any operations
	connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
	console.log("Using Firebase Auth emulator at localhost:9099");
}

export { auth };
export default app;
