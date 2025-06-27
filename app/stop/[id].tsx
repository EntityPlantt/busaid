import BackButton from "@/components/BackButton";
import BusRoute from "@/components/BusRoute";
import { useColors, useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { setUserData, useUserData } from "@/lib/userdata";
import { FontAwesome } from "@expo/vector-icons";
import { impactAsync } from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function Stop() {
	const id = parseInt(useLocalSearchParams().id as string);
	const stop = db.data.stops[id];
	const userdata = useUserData();
	const [refreshing, setRefreshing] = useState(false);
	const [star, setStar] = useState(0);
	const styles = useStyles(), colors = useColors();
	const [stopLines, setStopLines] = useState([] as {
		routeId: number;
		arrival: number;
	}[]);
	async function refresh() {
		console.log("Refreshing");
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
		console.log("Refreshed", r.length);
	}
	useEffect(() => {
		refresh();
		setStar(userdata.destinations.includes(id) ? 1 : (userdata.interdestinations.includes(id) ? 2 : 0));
	}, []);
	console.log(userdata.destinations, userdata.interdestinations, star);
	async function starClick() {
		console.log("Star click", id);
		if (star == 1) userdata.destinations.splice(userdata.destinations.indexOf(id), 1);
		if (star == 2) userdata.interdestinations.splice(userdata.interdestinations.indexOf(id), 1);
		if (star == 0) userdata.destinations.push(id);
		await impactAsync();
		setUserData(userdata);
		setStar(star ? 0 : 1);
	}
	async function starLongPress() {
		console.log("Star long press", id);
		if (star == 2) return;
		if (star == 1) userdata.destinations.splice(userdata.destinations.indexOf(id), 1);
		userdata.interdestinations.push(id);
		await impactAsync();
		setUserData(userdata);
		setStar(2);
	}
	return <SafeAreaView style={styles.view}>
		<BackButton />
		<TouchableOpacity style={styles.stopStar} onPress={starClick} onLongPress={starLongPress}>
			<FontAwesome style={styles.topBtnIcon} name={star ? "star" : "star-o"} color={[colors.text, colors.accent, colors.blue][star]} size={28} />
		</TouchableOpacity>
		<Text style={styles.heading}><Text style={styles.muted}>{stop.number}</Text> {stop.name}</Text>
		<Text style={[styles.text, styles.muted]}>{stop.lat}, {stop.lon}</Text>
		{stop.note && <Text style={styles.text}>{stop.note}</Text>}
		{refreshing ? <Text style={styles.heading}>Лоадирање...</Text> : <FlatList data={stopLines.slice(0, 50)}
			renderItem={({ item }) => <BusRoute id={item.routeId} arrival={item.arrival} />}
			keyExtractor={item => item.routeId + " " + item.arrival}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />} />
		}
	</SafeAreaView>;
}