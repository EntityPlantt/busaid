import useLoaded from "@/hooks/useLoaded";
import useTheme from "@/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	let theme = useTheme();
	if (!useLoaded()) return null;
	return <ThemeProvider value={theme}>
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
		<StatusBar style="auto" />
	</ThemeProvider>;
}