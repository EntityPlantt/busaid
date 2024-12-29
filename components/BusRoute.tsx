import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useJSPDBLoaded from "@/hooks/useJSPDBLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusRoute({ id }: { id: number }) {
	let loaded = useJSPDBLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let route = db.data.routes[id];
	return <TouchableOpacity style={styles.item} onPress={() => router.push(`/route/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{route.id}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{route.name}</Text>
		</View>
	</TouchableOpacity>;
}