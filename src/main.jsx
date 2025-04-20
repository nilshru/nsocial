
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { HashRouter } from "react-router-dom"; // ⬅️ changed here

const styles = {
	global: (props) => ({
		body: {
			bg: mode("gray.100", "gray.900")(props),
			color: mode("gray.900", "whiteAlpha.900")(props),
		},
	}),
};

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HashRouter> {/* ⬅️ changed here */}
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</HashRouter>
	</React.StrictMode>
);
