import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusStop({ id }: { id: number }) {
	let loaded = useLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let stop = db.data.stops[id];
	return <TouchableOpacity style={styles.item} onPress={() => router.push(`/stop/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{stop.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{stop.name}</Text>
		</View>
	</TouchableOpacity>;
}