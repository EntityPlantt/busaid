import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useJSPDBLoaded from "@/hooks/jspdb";
import { styles } from "@/constants/StyleSheet";
import { router } from "expo-router";

export default function BusRoute({ id }: { id: number }) {
	let loaded = useJSPDBLoaded();
	if (!loaded) return null;
	let route = db.data.routes.find(x => x.id == id)!;
	return <TouchableOpacity style={styles.line} onPress={() => router.push(`/route/${id}`)}>
		<View style={styles.lineNumber}>
			<Text style={styles.lineNumberText}>{route.id}</Text>
		</View>
		<View style={styles.lineData}>
			<Text style={styles.lineName}>{route.name}</Text>
		</View>
	</TouchableOpacity>;
}