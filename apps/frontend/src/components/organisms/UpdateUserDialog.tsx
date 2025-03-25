"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserForm from "../molecules/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUser } from "../../store/userSlice";
import { getAuth } from "firebase/auth";
import { User } from "../../apis/user";

interface UpdateUserDialogProps {
	open: boolean;
	onClose: () => void;
	user: User | null;
}

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({
	open,
	onClose,
	user,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.user);
	const auth = getAuth();

	const handleSubmit = async (data: Partial<User>) => {
		try {
			const token = await auth.currentUser?.getIdToken();
			if (token) {
				await dispatch(updateUser({ token, userData: data }));
				onClose();
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	if (!user) return null;

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Update User</DialogTitle>
			<DialogContent>
				<UserForm
					mode="update"
					user={user}
					onSubmit={handleSubmit}
					onCancel={onClose}
					isLoading={loading}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateUserDialog;
