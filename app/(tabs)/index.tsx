import { View } from "react-native";
import { styles } from "@/constants/StyleSheet";
import BusLine from "@/components/BusLine";
import useJSPDBLoaded from "@/hooks/jspdb";

export default function Index() {
	let loaded = useJSPDBLoaded();
	if (!loaded) return null;
	return <View style={styles.view}>
		<BusLine id={1} />
		<BusLine id={2} />
	</View>;
}