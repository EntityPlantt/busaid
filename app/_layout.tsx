import useTheme from "@/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SingletonHooksContainer } from "react-singleton-hook";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function RootLayout() {
	const theme = useTheme();
	useEffect(() => {
		NavigationBar.setBackgroundColorAsync(theme.colors.background);
		NavigationBar.setButtonStyleAsync(theme.dark ? "light" : "dark");
	}, [theme]);
	return <ThemeProvider value={theme}>
		<SingletonHooksContainer />
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
		<StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background} />
	</ThemeProvider>;
}