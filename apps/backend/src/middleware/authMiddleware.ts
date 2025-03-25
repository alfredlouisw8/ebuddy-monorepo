import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../config/firebaseConfig";

declare global {
	namespace Express {
		interface Request {
			user?: DecodedIdToken;
		}
	}
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const decodedToken = await auth.verifyIdToken(token);
		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
		return;
	}
};
