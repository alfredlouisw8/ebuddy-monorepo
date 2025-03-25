"use client";

import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface ActionButtonProps {
	onClick: () => void;
	loading?: boolean;
	color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
	variant?: "text" | "outlined" | "contained";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	startIcon?: React.ReactNode;
	children: React.ReactNode;
	fullWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	loading = false,
	color = "primary",
	variant = "contained",
	size = "medium",
	disabled = false,
	startIcon,
	children,
	fullWidth = false,
}) => {
	return (
		<Button
			onClick={onClick}
			color={color}
			variant={variant}
			size={size}
			disabled={disabled || loading}
			startIcon={
				loading ? <CircularProgress size={20} color="inherit" /> : startIcon
			}
			fullWidth={fullWidth}
		>
			{children}
		</Button>
	);
};

export default ActionButton;
