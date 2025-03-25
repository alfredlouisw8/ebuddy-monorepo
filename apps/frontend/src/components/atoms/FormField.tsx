"use client";

import React from "react";
import { TextField, FormHelperText, FormControl } from "@mui/material";
import {
	Controller,
	Control,
	FieldValues,
	FieldPath,
	FieldError,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	error?: FieldError;
	type?: string;
	disabled?: boolean;
	required?: boolean;
}

const FormField = <T extends FieldValues>({
	name,
	control,
	label,
	error,
	type = "text",
	disabled = false,
	required = false,
}: FormFieldProps<T>) => {
	return (
		<FormControl fullWidth margin="normal">
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label={label}
						type={type}
						error={!!error}
						disabled={disabled}
						required={required}
						fullWidth
						value={field.value || ""}
					/>
				)}
			/>
			{error && <FormHelperText error>{error.message}</FormHelperText>}
		</FormControl>
	);
};

export default FormField;
