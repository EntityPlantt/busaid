import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useJSPDBLoaded from "@/hooks/useJSPDBLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusRouteArrival({ id, arrival }: { id: number, arrival: number }) {
	let loaded = useJSPDBLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let route = db.data.routes[id];
	let line = db.data.lines[route.lineId];
	return <TouchableOpacity style={styles.item} onPress={() => router.push(`/line/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{line.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{route.name}</Text>
		</View>
		<View style={styles.itemEnd}>
			<Text style={styles.itemText}>{(arrival / 60).toFixed(0)}:{(arrival % 60).toFixed(0).padStart(2, "0")}</Text>
		</View>
	</TouchableOpacity>;
}