"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Box,
	Container,
	Typography,
	AppBar,
	Toolbar,
	Button,
} from "@mui/material";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../firebase/config"; // Import to initialize Firebase
import UserList from "../components/organisms/UserList";

export default function DashboardPage() {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				router.push("/login");
			} else {
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, [router]);

	const handleLogout = async () => {
		await signOut(getAuth());
		router.push("/login");
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Dashboard
					</Typography>
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<UserList />
			</Container>
		</>
	);
}
