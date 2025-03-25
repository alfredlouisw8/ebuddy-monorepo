import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../apis/user";
import {
	createUserData,
	deleteUserData,
	fetchUserData,
	updateUserData,
} from "../apis/userApi";

interface UserState {
	users: User[];
	selectedUser: User | null;
	loading: boolean;
	error: string | null;
	success: string | null;
}

const initialState: UserState = {
	users: [],
	selectedUser: null,
	loading: false,
	error: null,
	success: null,
};
// Fetch all users
export const fetchUsers = createAsyncThunk(
	"user/fetchUsers",
	async ({
		token,
		limit = 6,
		offset = 0,
	}: {
		token: string;
		limit?: number;
		offset?: number;
	}) => {
		return await fetchUserData(token, limit, offset);
	}
);

// Create a new user
export const createNewUser = createAsyncThunk(
	"user/createUser",
	async ({
		token,
		userData,
	}: {
		token: string;
		userData: Omit<User, "id">;
	}) => {
		return await createUserData(token, userData);
	}
);

// Update an existing user
export const updateUser = createAsyncThunk(
	"user/updateUser",
	async ({ token, userData }: { token: string; userData: Partial<User> }) => {
		return await updateUserData(token, userData);
	}
);

// Delete a user
export const removeUser = createAsyncThunk(
	"user/deleteUser",
	async ({ token, userId }: { token: string; userId: string }) => {
		await deleteUserData(token, userId);
		return userId;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearMessages: (state) => {
			state.error = null;
			state.success = null;
		},
		setSelectedUser: (state, action: PayloadAction<User | null>) => {
			state.selectedUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch users
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.loading = false;
				state.users = action.payload;
				state.success = "Users loaded successfully";
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch users";
			})

			// Create user
			.addCase(createNewUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				createNewUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.loading = false;

					if (state.users.length < 6) {
						state.users.push(action.payload);
					}
					state.success = "User created successfully";
				}
			)
			.addCase(createNewUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to create user";
			})

			// Update user
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.success = "User updated successfully";

				// Update the user in the users array
				const index = state.users.findIndex(
					(user) => user.id === action.payload.id
				);
				if (index !== -1) {
					state.users[index] = action.payload;
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to update user";
			})

			// Delete user
			.addCase(removeUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.loading = false;
				state.users = state.users.filter((user) => user.id !== action.payload);
				state.success = "User deleted successfully";
			})
			.addCase(removeUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to delete user";
			});
	},
});

export const { clearMessages, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
