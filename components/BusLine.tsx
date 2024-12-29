import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusLine({ id }: { id: number }) {
	let loaded = useLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let line = db.data.lines[id];
	return <TouchableOpacity style={styles.item} onPress={() => router.push(`/line/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{line.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{line.name}</Text>
		</View>
		{/* <View style={styles.itemEnd}>
			<Text style={styles.itemText}>{arrivalTime}</Text>
		</View> */}
	</TouchableOpacity>;
}