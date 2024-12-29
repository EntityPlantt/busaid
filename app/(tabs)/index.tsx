import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useJSPDBLoaded from "@/hooks/useJSPDBLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusLine from "@/components/BusLine";

export default function Index() {
	let loaded = useJSPDBLoaded();
	const styles = useStyles();
	const colors = useColors();
	if (!loaded) return null;
	return <ScrollView style={styles.view}>
		<Text style={styles.heading}>Планер</Text>
		<Text style={styles.text}>Дестинации</Text>
		<View>
			<TouchableOpacity>
				<FontAwesome name="plus" size={28} color={colors.text} />
			</TouchableOpacity>
		</View>
		<BusLine id={1} />
	</ScrollView>;
}