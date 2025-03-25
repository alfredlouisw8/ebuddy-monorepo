import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

export const getAllUsers = async (limit = 6, offset = 0): Promise<User[]> => {
	const snapshot = await db
		.collection("USERS")
		.limit(limit)
		.offset(offset)
		.get();
	return snapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as User
	);
};

export const updateUser = async (
	userData: Partial<User>
): Promise<User | null> => {
	if (!userData.id) throw new Error("User ID is required");

	const userRef = db.collection("USERS").doc(userData.id);
	await userRef.update(userData);
	const updatedDoc = await userRef.get();

	return updatedDoc.exists ? (updatedDoc.data() as User) : null;
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
	const userRef = db.collection("USERS").doc(); // auto-generated ID
	const id = userRef.id;

	const fullUserData: User = {
		id,
		...userData,
		createdAt: new Date(),
	};

	await userRef.set(fullUserData);
	return fullUserData;
};

export const deleteUser = async (id: string): Promise<boolean> => {
	const userRef = db.collection("USERS").doc(id);
	const doc = await userRef.get();
	if (!doc.exists) return false;

	await userRef.delete();
	return true;
};
