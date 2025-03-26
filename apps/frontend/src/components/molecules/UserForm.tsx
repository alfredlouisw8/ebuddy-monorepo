"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "../atoms/FormField";
import { UserSchema } from "../../apis/user";

const CreateUserSchema = UserSchema.omit({ id: true });

type CreateUserInput = z.infer<typeof CreateUserSchema>;
type UpdateUserInput = z.infer<typeof UserSchema>;

interface UserFormProps {
	user?: Partial<UpdateUserInput>;
	onSubmit: (data: CreateUserInput | UpdateUserInput) => void;
	onCancel: () => void;
	isLoading?: boolean;
	mode: "create" | "update";
}

const UserForm: React.FC<UserFormProps> = ({
	user,
	onSubmit,
	onCancel,
	isLoading = false,
	mode,
}) => {
	const schema = mode === "create" ? CreateUserSchema : UserSchema;
	const formType = mode === "create" ? CreateUserSchema : UserSchema;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formType>>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			...(mode === "update" && user?.id ? { id: user.id } : {}),
		} as any,
	});

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<FormField
				name="name"
				label="Name"
				control={control}
				error={errors.name}
			/>
			<FormField
				name="email"
				label="Email"
				control={control}
				error={errors.email}
			/>

			<Box display="flex" gap={1} justifyContent="flex-end">
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant="contained" type="submit" disabled={isLoading}>
					{isLoading
						? "Saving..."
						: mode === "create"
							? "Create User"
							: "Update User"}
				</Button>
			</Box>
		</Box>
	);
};

export default UserForm;
