import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useColors, useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";
import { useUserData } from "@/lib/userdata";

export default function BusStop({ id }: { id: number }) {
	let loaded = useLoaded();
	const styles = useStyles(), userdata = useUserData(), colors = useColors();
	if (!loaded) return null;
	let stop = db.data.stops[id];
	const backgroundColor = (userdata.destinations.has(id) ? colors.accent : userdata.interdestinations.has(id) ? colors.blue : colors.muted) + "40";
	return <TouchableOpacity style={[styles.item, {backgroundColor}]} onPress={() => router.push(`/stop/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{stop.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{stop.name}</Text>
		</View>
	</TouchableOpacity>;
}