import BackButton from "@/components/BackButton";
import { styles } from "@/constants/StyleSheet";
import db from "@/lib/jspdb";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Line() {
	let id = parseInt(useLocalSearchParams().id as string);
	let route = db.data.routes.find(l => l.id == id);
	let line = db.data.lines.find(l => l.id == route?.lineId);
	if (!route || !line) return <View style={styles.view}>
		<Text style={styles.text}>Рутата не постои или е невалидна.</Text>
	</View>;
	return <View style={styles.view}>
		<BackButton />
		<Text style={styles.heading}>{route.name}</Text>
		<Text style={styles.text}>{line.name}</Text>
	</View>;
}