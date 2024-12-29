import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusRoute({ id, arrival }: { id: number, arrival?: number }) {
	let loaded = useLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let route = db.data.routes[id];
	if (!route) return null;
	let line = db.data.lines[route.lineId];
	if (!line) return null;
	return <TouchableOpacity style={styles.item} onPress={() => router.push(`/route/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{line.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{route.name}</Text>
		</View>
		{typeof arrival == "number" && <View style={styles.itemEnd}>
			<Text style={styles.itemText}>{(arrival / 60).toFixed(0)}:{(arrival % 60).toFixed(0).padStart(2, "0")}</Text>
		</View>}
	</TouchableOpacity>;
}