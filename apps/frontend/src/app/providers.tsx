"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import theme from "../theme/theme";
import { store } from "../store/store";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</Provider>
	);
}
