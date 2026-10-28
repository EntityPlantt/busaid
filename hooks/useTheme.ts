import { Theme, DarkTheme as dt, DefaultTheme as lt } from "expo-router/react-navigation";
import useThemeType from "./useThemeType";

export const DarkTheme = {
	dark: true,
	fonts: dt.fonts,
	colors: {
		text: "#ffffff",
		background: "#121212",
		primary: "#00c418",
		border: "#272729",
		card: "#242424",
		notification: "#00c418"
	}
}, DefaultTheme = {
	dark: false,
	fonts: lt.fonts,
	colors: {
		text: "#212121",
		background: "#ffffff",
        primary: "#00c418",
        border: "#cccccc",
        card: "#f5f5f5",
        notification: "#00c418"
	}
};

export default function useTheme() {
	return useThemeType().theme == "dark" ? DarkTheme : DefaultTheme;
}