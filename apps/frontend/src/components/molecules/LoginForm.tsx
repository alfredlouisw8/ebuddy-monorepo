"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Alert, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import FormField from "../atoms/FormField";
import ActionButton from "../atoms/ActionButton";
import { Login } from "@mui/icons-material";
import { LoginFormData, LoginSchema } from "../../apis/auth";

const LoginForm: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push("/");
			}
		});

		return () => unsubscribe();
	}, [router]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async (data: LoginFormData) => {
		setLoading(true);
		setError(null);

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);

			const token = await userCredential.user.getIdToken();
			router.push("/");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				padding: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					width: "100%",
					maxWidth: { xs: "100%", sm: "400px" },
				}}
			>
				<Typography variant="h5" component="h1" gutterBottom align="center">
					Login
				</Typography>

				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
					<FormField
						name="email"
						control={control}
						label="Email Address"
						error={errors.email}
						type="email"
						required
						disabled={loading}
					/>

					<FormField
						name="password"
						control={control}
						label="Password"
						error={errors.password}
						type="password"
						required
						disabled={loading}
					/>

					<Grid container spacing={2} sx={{ mt: 2 }}>
						<Grid item xs={12}>
							<ActionButton
								onClick={handleSubmit(handleLogin)}
								loading={loading}
								fullWidth
								startIcon={<Login />}
							>
								Sign In
							</ActionButton>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default LoginForm;
