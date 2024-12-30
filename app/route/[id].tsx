import BackButton from "@/components/BackButton";
import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { useLocalSearchParams } from "expo-router";
import { FlatList, SafeAreaView, Text, View } from "react-native";

export default function Route() {
	let id = parseInt(useLocalSearchParams().id as string);
	let route = db.data.routes[id];
	let line = db.data.lines[route?.lineId];
	const styles = useStyles();
	if (!route || !line) return <View style={styles.view}>
		<Text style={styles.text}>Рутата не постои или е невалидна.</Text>
	</View>;
	return <SafeAreaView style={styles.view}>
		<BackButton />
		<Text style={styles.heading}>{route.name}</Text>
		<Text style={styles.text}>{line.name}</Text>
		<FlatList data={route.stopIds} renderItem={({ item }) => <BusStop id={item} />} keyExtractor={String} />
	</SafeAreaView>;
}