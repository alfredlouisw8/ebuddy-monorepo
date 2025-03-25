import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
	createUserData,
	deleteUserData,
	fetchUserData,
	updateUserData,
} from "../controller/userController";

const router = Router();

router.use(authMiddleware);

router.get("/fetch-user-data", fetchUserData);
router.patch("/update-user-data", updateUserData);
router.post("/create-user-data", createUserData);
router.delete("/delete-user-data/:id", deleteUserData);

export default router;
