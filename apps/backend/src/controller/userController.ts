import { Request, Response } from "express";
import * as userRepo from "../repository/userCollection";
import { UserSchema } from "../entities/user";

export const fetchUserData = async (req: Request, res: Response) => {
	try {
		const limit = Number(req.query.limit) || 6;
		const offset = Number(req.query.offset) || 0;

		const users = await userRepo.getAllUsers(limit, offset);
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateUserData = async (req: Request, res: Response) => {
	try {
		const { id, ...rest } = req.body;

		if (!id) {
			res.status(400).json({ error: "User ID is required for update" });
			return;
		}

		const updated = await userRepo.updateUser({ id, ...rest });
		if (!updated) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.status(200).json(updated);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const createUserData = async (req: Request, res: Response) => {
	try {
		const schema = UserSchema.omit({ id: true });
		const parseResult = schema.safeParse(req.body);

		if (!parseResult.success) {
			res.status(400).json({ error: parseResult.error.format() });
			return;
		}

		const createdUser = await userRepo.createUser(parseResult.data);
		res.status(201).json(createdUser);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteUserData = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "User ID is required" });
			return;
		}

		const success = await userRepo.deleteUser(id);
		if (!success) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
