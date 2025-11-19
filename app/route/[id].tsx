import BackButton from "@/components/BackButton";
import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { setUserData, useUserData } from "@/lib/userdata";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Route() {
	let id = parseInt(useLocalSearchParams().id as string);
	let route = db.data.routes[id];
	let line = db.data.lines[route?.lineId];
	const styles = useStyles();
	const userdata = useUserData();
	useEffect(() => {
		if (userdata.recentRoutes.includes(id)) userdata.recentRoutes.splice(userdata.recentRoutes.indexOf(id), 1);
		userdata.recentRoutes.unshift(id);
		userdata.recentRoutes.splice(20);
		setUserData(userdata);
	}, []);
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