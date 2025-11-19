import BackButton from "@/components/BackButton";
import BusRoute from "@/components/BusRoute";
import ButtonPanel from "@/components/ButtonPanel";
import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { setUserData, useUserData } from "@/lib/userdata";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Line() {
	let id = parseInt(useLocalSearchParams().id as string);
	let line = db.data.lines[id];
	const styles = useStyles();
	const userdata = useUserData();
	useEffect(() => {
		if (userdata.recentLines.includes(id)) userdata.recentLines.splice(userdata.recentLines.indexOf(id), 1);
		userdata.recentLines.unshift(id);
		userdata.recentLines.splice(20);
		setUserData();
	}, []);
	if (!line) return <View style={styles.view}>
		<Text style={styles.text}>Линијата не постои.</Text>
	</View>;
	return <SafeAreaView style={styles.view}>
		<ButtonPanel>
			<BackButton />
			{null}
		</ButtonPanel>
		<Text style={styles.heading}>{line.name}</Text>
		<Text style={styles.text}>{line.type} {line.kind}</Text>
		{line.nightly && <Text style={styles.text}>🌙 Ноќна</Text>}
		<Text style={styles.text}>Претпријатие: {line.carrier}</Text>
		<FlatList data={line.routeIds} renderItem={({ item }) => <BusRoute id={item} />} keyExtractor={String} />
	</SafeAreaView>;
}