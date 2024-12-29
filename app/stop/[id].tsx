import BackButton from "@/components/BackButton";
import BusRouteArrival from "@/components/BusRouteArrival";
import { useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text } from "react-native";

export default function Stop() {
	let id = parseInt(useLocalSearchParams().id as string);
	let stop = db.data.stops[id];
	let [refreshing, setRefreshing] = useState(false);
	const styles = useStyles();
	const [stopLines, setStopLines] = useState([] as {
		routeId: number;
		arrival: number;
	}[]);
	async function refresh() {
		setRefreshing(true);
		let sl = await db.getStopLines(id);
		let r = [] as typeof stopLines;
		sl.forEach(x => {
			x.remainingTime.forEach(y => {
				r.push({ routeId: x.routeId, arrival: y });
			});
		});
		r.sort((a, b) => a.arrival - b.arrival);
		setStopLines(r);
		setRefreshing(false);
	}
	useEffect(() => {
		refresh();
	}, [id]);
	return <SafeAreaView style={styles.view}>
		<BackButton />
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			<Text style={styles.heading}><Text style={styles.muted}>{stop.number}</Text> {stop.name}</Text>
			<Text style={styles.text}><Text style={styles.muted}>{stop.lat}, {stop.lon}</Text></Text>
			{stop.note && <Text style={styles.text}>{stop.note}</Text>}
			{stopLines.map(sl => <BusRouteArrival id={sl.routeId} arrival={sl.arrival} key={sl.routeId + " " + sl.arrival} />)}
		</ScrollView>
	</SafeAreaView>;
}