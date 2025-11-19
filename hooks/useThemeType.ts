import { setUserData, useUserData } from "@/lib/userdata";
import { useColorScheme } from "react-native";


export default function useThemeType() {
	const userdata = useUserData(), scheme = useColorScheme();
	async function updateTheme(th: string | null) {
		userdata.theme = th;
		setUserData();
	}
	return {theme: userdata.theme || scheme, themeSetting: userdata.theme, updateTheme};
}