import { User } from "./user";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const fetchUserData = async (
	token: string,
	limit = 6,
	offset = 0
): Promise<User[]> => {
	const response = await fetch(
		`${API_BASE}/user/fetch-user-data?limit=${limit}&offset=${offset}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.error || `Error: ${response.status}`);
	}

	return response.json();
};

export const createUserData = async (
	token: string,
	userData: Omit<User, "id">
): Promise<User> => {
	const response = await fetch(`${API_BASE}/user/create-user-data`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.error || `Error: ${response.status}`);
	}

	return response.json();
};

export const updateUserData = async (
	token: string,
	userData: Partial<User>
): Promise<User> => {
	const response = await fetch(`${API_BASE}/user/update-user-data`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.error || `Error: ${response.status}`);
	}

	return response.json();
};

export const deleteUserData = async (
	token: string,
	userId: string
): Promise<void> => {
	const response = await fetch(`${API_BASE}/user/delete-user-data/${userId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.error || `Error: ${response.status}`);
	}
};
