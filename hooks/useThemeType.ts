import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";


export default function useThemeType() {
	let [theme, setTheme] = useState(null as string | null);
	let scheme = useColorScheme();
	useEffect(() => {
		AsyncStorage.getItem("theme").then(setTheme);
	}, []);
	async function updateTheme(th: string | null) {
		if (th) await AsyncStorage.setItem("theme", th);
		else await AsyncStorage.removeItem("theme");
		setTheme(th);
	}
	return {theme: theme || scheme, themeSetting: theme, updateTheme};
}