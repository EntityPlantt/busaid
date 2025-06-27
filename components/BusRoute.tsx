import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useColors, useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";
import { useUserData } from "@/lib/userdata";
import { useMemo } from "react";

export default function BusRoute({ id, arrival }: { id: number, arrival?: number }) {
	const loaded = useLoaded();
	const styles = useStyles(), colors = useColors();
	const userdata = useUserData();
	let route = db.data.routes[id];
	const backgroundColor = useMemo(() => (loaded && route ? route.stopIds.some(x => userdata.destinations.has(x)) ? colors.accent : (
		route.stopIds.some(x => userdata.interdestinations.has(x)) ? colors.blue : colors.muted
	) : "#000000") + "40", [userdata, loaded]);
	return <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={() => router.push(`/route/${id}`)}>
		<View style={styles.itemNo}>
			<Text style={styles.itemNoText}>{db.data.lines[route?.lineId]?.number || "?"}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={styles.itemText}>{route?.name}</Text>
		</View>
		{typeof arrival == "number" && <View style={styles.itemEnd}>
			<Text style={styles.itemText}>{Math.floor(arrival / 60)}:{(arrival % 60).toFixed(0).padStart(2, "0")}</Text>
		</View>}
	</TouchableOpacity>;
}