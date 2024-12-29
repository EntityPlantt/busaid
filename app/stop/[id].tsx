import BackButton from "@/components/BackButton";
import BusRoute from "@/components/BusRoute";
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
	return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
		<SafeAreaView style={styles.view}>
			<BackButton />
			<Text style={styles.heading}><Text style={styles.muted}>{stop.number}</Text> {stop.name}</Text>
			<Text style={styles.text}><Text style={styles.muted}>{stop.lat}, {stop.lon}</Text></Text>
			{refreshing ? <Text style={styles.heading}>Лоадирање...</Text> : [
				stop.note && <Text style={styles.text}>{stop.note}</Text>,
				stopLines.slice(0, 20).map(sl => <BusRoute id={sl.routeId} arrival={sl.arrival} key={sl.routeId + " " + sl.arrival} />)
			]}
		</SafeAreaView>
	</ScrollView>;
}