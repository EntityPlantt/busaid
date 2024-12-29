import useJSPDBLoaded from "@/hooks/useJSPDBLoaded";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
	let scheme = useColorScheme();
	if (!useJSPDBLoaded()) return null;
	return <ThemeProvider value={scheme == "dark" ? DarkTheme : DefaultTheme}>
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
		<StatusBar style="auto" />
	</ThemeProvider>;
}