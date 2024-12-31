import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useColors, useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";
import { useUserData } from "@/lib/userdata";

export default function BusRoute({ id, arrival }: { id: number, arrival?: number }) {
	let loaded = useLoaded();
	const styles = useStyles(), colors = useColors();
	const userdata = useUserData();
	if (!loaded) return null;
	let route = db.data.routes[id];
	if (!route) return null;
	let line = db.data.lines[route.lineId];
	if (!line) return null;
	const backgroundColor = (route.stopIds.some(x => userdata.destinations.has(x)) ? colors.accent : (
		route.stopIds.some(x => userdata.interdestinations.has(x)) ? colors.blue : colors.muted
	)) + "40";
	return <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={() => router.push(`/route/${id}`)}>
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