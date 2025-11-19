import BackButton from "@/components/BackButton";
import BusRoute from "@/components/BusRoute";
import ButtonPanel from "@/components/ButtonPanel";
import { useColors, useStyles } from "@/hooks/stylesheet";
import db from "@/lib/jspdb";
import { setUserData, useUserData } from "@/lib/userdata";
import { FontAwesome } from "@expo/vector-icons";
import { impactAsync } from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { CurvedTransition } from "react-native-reanimated";

const secs = () => Math.floor(Date.now() / 1e3);

export default function Stop() {
	const id = parseInt(useLocalSearchParams().id as string);
	const stop = db.data.stops[id];
	const userdata = useUserData();
	const [refreshing, setRefreshing] = useState(false);
	const [star, setStar] = useState(0);
	const styles = useStyles(), colors = useColors();
	const [stopLines, setStopLines] = useState([] as { routeId: number; arrival: number; index: number; }[]);
	const [time, setTime] = useState(secs());
	async function refresh() {
		setRefreshing(true);
		try {
			let sl = await db.getStopLines(id);
			let r: typeof stopLines = [];
			sl.forEach(x => {
				x.remainingTime.forEach((y, index) => {
					r.push({ routeId: x.routeId, arrival: secs() + y, index });
				});
			});
			r.sort((a, b) => a.arrival - b.arrival);
			setStopLines(r);
		} catch (_) {
			console.error(_);
		}
		setRefreshing(false);
	}
	useEffect(() => {
		refresh();
		setStar(userdata.destinations.has(id) ? 1 : (userdata.interdestinations.has(id) ? 2 : 0));
		if (userdata.recentStops.includes(id)) userdata.recentStops.splice(userdata.recentStops.indexOf(id), 1);
		userdata.recentStops.unshift(id);
		userdata.recentStops.splice(20);
		setUserData();
		let interval = setInterval(() => setTime(secs()), 500);
		return () => clearInterval(interval);
	}, []);
	async function starClick() {
		if (star == 1) userdata.destinations.delete(id);
		if (star == 2) userdata.interdestinations.delete(id);
		if (star == 0) userdata.destinations.add(id);
		await impactAsync();
		setUserData();
		setStar(star ? 0 : 1);
	}
	async function starLongPress() {
		if (star == 2) return;
		if (star == 1) userdata.destinations.delete(id);
		userdata.interdestinations.add(id);
		await impactAsync();
		setUserData();
		setStar(2);
	}
	return <SafeAreaView style={styles.view}>
		<ButtonPanel>
			<BackButton />
			{null}
			<TouchableOpacity style={styles.button} onPress={starClick} onLongPress={starLongPress}>
				<FontAwesome style={styles.topBtnIcon} name={star ? "star" : "star-o"} color={[colors.text, colors.accent, colors.blue][star]} size={28} />
			</TouchableOpacity>
		</ButtonPanel>
		<Text style={styles.heading}><Text style={styles.muted}>{stop.number}</Text> {stop.name}</Text>
		<Text style={[styles.text, styles.muted]}>{stop.lat}, {stop.lon}</Text>
		{stop.note && <Text style={styles.text}>{stop.note}</Text>}
		<Animated.FlatList data={stopLines.slice(0, 50)}
			renderItem={({ item }) => <BusRoute id={item.routeId} arrival={item.arrival - time} arrtime={item.arrival} />}
			keyExtractor={item => item.routeId + " " + item.index}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
			itemLayoutAnimation={CurvedTransition.duration(750)} />
	</SafeAreaView>;
}