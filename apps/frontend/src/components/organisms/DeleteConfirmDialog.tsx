"use client";

import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	CircularProgress,
} from "@mui/material";

interface DeleteConfirmDialogProps {
	open: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
	open,
	title,
	message,
	onConfirm,
	onCancel,
	isLoading = false,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button
					onClick={onConfirm}
					color="error"
					disabled={isLoading}
					startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
				>
					{isLoading ? "Deleting..." : "Delete"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmDialog;
