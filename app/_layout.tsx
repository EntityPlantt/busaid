import useTheme from "@/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SingletonHooksContainer } from "react-singleton-hook";

export default function RootLayout() {
	let theme = useTheme();
	return <ThemeProvider value={theme}>
		<SingletonHooksContainer />
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
		<StatusBar style="auto" />
	</ThemeProvider>;
}