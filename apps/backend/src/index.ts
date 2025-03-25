import * as functions from "firebase-functions";
import app from "./core/app";

// Expose it as a Firebase HTTPS function
export const api = functions.https.onRequest(app);
