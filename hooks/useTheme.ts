import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function useTheme() {
	return useColorScheme() == "dark" ? DarkTheme : DefaultTheme;
}