import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useJSPDBLoaded from "@/hooks/jspdb";
import { styles } from "@/constants/StyleSheet";
import { router } from "expo-router";

export default function BusLine({ id, arrivalTime }: { id: number, arrivalTime?: string }) {
	let loaded = useJSPDBLoaded();
	if (!loaded) return null;
	let line = db.data.lines.find(x => x.id == id)!;
	return <TouchableOpacity style={styles.line} onPress={() => router.push(`/line/${id}`)}>
		<View style={styles.lineNumber}>
			<Text style={styles.lineNumberText}>{line.number}</Text>
		</View>
		<View style={styles.lineData}>
			<Text style={styles.lineName}>{line.name}</Text>
		</View>
		<View style={styles.lineTime}>
			<Text style={styles.lineName}>{arrivalTime}</Text>
		</View>
	</TouchableOpacity>;
}