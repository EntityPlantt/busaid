import BackButton from "@/components/BackButton";
import BusRoute from "@/components/BusRoute";
import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Line() {
	let id = parseInt(useLocalSearchParams().id as string);
	let line = db.data.lines[id];
	const styles = useStyles();
	if (!line) return <View style={styles.view}>
		<Text style={styles.text}>Линијата не постои.</Text>
	</View>;
	return <View style={styles.view}>
		<BackButton />
		<Text style={styles.heading}>{line.name}</Text>
		<Text style={styles.text}>{line.type} {line.kind}</Text>
		{line.nightly && <Text style={styles.text}>🌙 Ноќна</Text>}
		<Text style={styles.text}>Претпријатие: {line.carrier}</Text>
		<ScrollView>{line.routeIds.map(x => <BusRoute id={x} key={x}/>)}</ScrollView>
	</View>;
}