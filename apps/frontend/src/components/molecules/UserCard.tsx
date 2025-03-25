"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import ActionButton from "../atoms/ActionButton";
import { Edit, Delete } from "@mui/icons-material";
import { User } from "../../apis/user";

interface UserCardProps {
	user: User;
	onUpdate: (user: User) => void;
	onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUpdate, onDelete }) => {
	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Typography variant="h6" component="div">
					{user.name}
				</Typography>
				<Typography variant="body2" color="text.secondary" gutterBottom>
					{user.email}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					ID: {user.id}
				</Typography>

				<Stack direction="row" spacing={1} sx={{ mt: 2 }}>
					<ActionButton
						onClick={() => onUpdate(user)}
						size="small"
						startIcon={<Edit />}
						variant="outlined"
					>
						Edit
					</ActionButton>
					<ActionButton
						onClick={() => onDelete(user.id)}
						size="small"
						color="error"
						startIcon={<Delete />}
						variant="outlined"
					>
						Delete
					</ActionButton>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default UserCard;
