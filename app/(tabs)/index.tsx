import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useJSPDBLoaded from "@/hooks/useJSPDBLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusLine from "@/components/BusLine";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	let loaded = useJSPDBLoaded();
	const styles = useStyles();
	const colors = useColors();
	if (!loaded) return null;
	return <SafeAreaView style={styles.view}>
		<Text style={styles.heading}>Планер</Text>
		<Text style={styles.text}>Дестинации</Text>
		<ScrollView style={{ maxHeight: 500 }}>
			<TouchableOpacity>
				<FontAwesome name="plus" size={28} color={colors.text} />
			</TouchableOpacity>
		</ScrollView>
		<BusLine id={1} />
	</SafeAreaView>;
}