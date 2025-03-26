import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
	FIREBASE_AUTH_EMULATOR_HOST,
	DEV_FIREBASE_CONFIG,
} from "@repo/shared/src/constants/firebase";

const app = initializeApp(DEV_FIREBASE_CONFIG);
const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
	connectAuthEmulator(auth, `http://${FIREBASE_AUTH_EMULATOR_HOST}`, {
		disableWarnings: true,
	});
}

export { auth };
export default app;
