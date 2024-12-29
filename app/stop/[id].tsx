import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Stop() {
	let id = parseInt(useLocalSearchParams().id as string);
	let stop = db.data.stops[id];
	const styles = useStyles();
	return <View style={styles.view}>
		<Text style={styles.heading}><Text style={styles.muted}>{stop.id}</Text> {stop.name}</Text>
	</View>;
}