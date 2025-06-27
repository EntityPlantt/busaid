import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";

export default function BusLine({ id, vert }: { id: number, vert?: boolean }) {
	let loaded = useLoaded();
	const styles = useStyles();
	if (!loaded) return null;
	let line = db.data.lines[id];
	return <TouchableOpacity style={vert ? styles.itemVert : styles.item} onPress={() => router.push(`/line/${id}`)}>
		<View style={vert ? styles.itemNoVert : styles.itemNo}>
			<Text style={vert ? styles.itemNoTextVert : styles.itemNoText}>{line.number}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={vert ? styles.itemTextVert : styles.itemText}>{line.name}</Text>
		</View>
	</TouchableOpacity>;
}