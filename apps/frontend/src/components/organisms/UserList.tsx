import React, { useState, useEffect } from "react";
import {
	Typography,
	Box,
	Grid,
	CircularProgress,
	Alert,
	Button,
} from "@mui/material";
import UserCard from "../molecules/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUsers, setSelectedUser, removeUser } from "../../store/userSlice";
import { getAuth } from "firebase/auth";
import CreateUserDialog from "./CreateUserDialog";
import UpdateUserDialog from "./UpdateUserDialog";
import { Add } from "@mui/icons-material";
import ActionButton from "../atoms/ActionButton";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { User } from "../../apis/user";
import Pagination from "../molecules/Pagination";

const UserList: React.FC = () => {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const limit = 6;

	const dispatch = useDispatch<AppDispatch>();
	const { users, loading, error, selectedUser } = useSelector(
		(state: RootState) => state.user
	);
	const auth = getAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await auth.currentUser?.getIdToken();
				if (token) {
					dispatch(fetchUsers({ token, limit, offset: page * limit }));
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchData();
	}, [dispatch, auth, page]);

	// Handlers
	const handleUpdateUser = (user: User) => {
		dispatch(setSelectedUser(user));
		setUpdateDialogOpen(true);
	};

	const handleDeleteUser = (userId: string) => {
		setUserToDelete(userId);
		setDeleteDialogOpen(true);
	};

	const handleNext = () => {
		setPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		setPage((prev) => Math.max(prev - 1, 0));
	};

	const confirmDelete = async () => {
		if (userToDelete) {
			try {
				const token = await auth.currentUser?.getIdToken();
				if (token) {
					await dispatch(removeUser({ token, userId: userToDelete }));
					setDeleteDialogOpen(false);
				}
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		}
	};

	return (
		<Box>
			<Box
				sx={{
					mb: 3,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" component="h2">
					User Management
				</Typography>
				<ActionButton
					onClick={() => setCreateDialogOpen(true)}
					startIcon={<Add />}
				>
					Create User
				</ActionButton>
			</Box>

			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{!loading && !error && users.length === 0 && (
				<Alert severity="info" sx={{ mb: 3 }}>
					No users found. Create a new user to get started.
				</Alert>
			)}

			<Grid container spacing={2}>
				{users.map((user) => (
					<Grid item xs={12} sm={6} md={4} key={user.id}>
						<UserCard
							user={user}
							onUpdate={handleUpdateUser}
							onDelete={handleDeleteUser}
						/>
					</Grid>
				))}
			</Grid>

			<Pagination
				page={page}
				loading={loading}
				handleNext={handleNext}
				handlePrev={handlePrev}
				disablePrevious={page === 0}
				disableNext={users.length < limit}
			/>

			<CreateUserDialog
				open={createDialogOpen}
				onClose={() => setCreateDialogOpen(false)}
			/>

			<UpdateUserDialog
				open={updateDialogOpen}
				onClose={() => {
					setUpdateDialogOpen(false);
					dispatch(setSelectedUser(null));
				}}
				user={selectedUser}
			/>

			<DeleteConfirmDialog
				open={deleteDialogOpen}
				title="Delete User"
				message="Are you sure you want to delete this user? This action cannot be undone."
				onConfirm={confirmDelete}
				onCancel={() => setDeleteDialogOpen(false)}
				isLoading={loading}
			/>
		</Box>
	);
};

export default UserList;
