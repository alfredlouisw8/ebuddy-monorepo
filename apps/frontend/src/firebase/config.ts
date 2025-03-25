import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Use placeholder values when in development mode
const firebaseConfig =
	process.env.NODE_ENV === "development"
		? {
				apiKey: "fake-api-key",
				authDomain: "localhost",
				projectId: "demo-project",
				storageBucket: "demo-project.appspot.com",
				messagingSenderId: "123456789",
				appId: "1:123456789:web:abcdef123456",
			}
		: {
				apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
				authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
				appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
			};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connect to emulator in development
if (process.env.NODE_ENV === "development") {
	// Must be called AFTER getAuth() but BEFORE any operations
	connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
	console.log("Using Firebase Auth emulator at localhost:9099");
}

export { auth };
export default app;
