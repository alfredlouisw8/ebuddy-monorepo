"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserForm from "../molecules/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createNewUser } from "../../store/userSlice";
import { getAuth } from "firebase/auth";
import { User } from "../../apis/user";

interface CreateUserDialogProps {
	open: boolean;
	onClose: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
	open,
	onClose,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.user);
	const auth = getAuth();

	const handleSubmit = async (data: Partial<User>) => {
		try {
			const token = await auth.currentUser?.getIdToken();
			if (token) {
				// Remove the id for creation since backend will generate it
				const { id, ...userData } = data;
				await dispatch(
					createNewUser({ token, userData: userData as Omit<User, "id"> })
				);
				onClose();
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Create New User</DialogTitle>
			<DialogContent>
				<UserForm
					mode="create"
					onSubmit={handleSubmit}
					onCancel={onClose}
					isLoading={loading}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateUserDialog;
