import useTheme from "@/hooks/useTheme";
import { ThemeProvider } from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SingletonHooksContainer } from "react-singleton-hook";
import { NavigationBar } from "expo-navigation-bar";

export default function RootLayout() {
	const theme = useTheme();
	return <ThemeProvider value={theme}>
		<NavigationBar style={theme.dark ? "light" : "dark"} />
		<SingletonHooksContainer />
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
		<StatusBar style={theme.dark ? "light" : "dark"} />
	</ThemeProvider>;
}