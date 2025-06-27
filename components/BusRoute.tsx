import db from "@/lib/jspdb";
import { View, Text, TouchableOpacity } from "react-native";
import useLoaded from "@/hooks/useLoaded";
import { useColors, useStyles } from "@/hooks/stylesheet";
import { router } from "expo-router";
import { useUserData } from "@/lib/userdata";
import { useMemo } from "react";

export default function BusRoute({ id, arrival, arrtime, vert }: { id: number, arrival?: number, arrtime?: number, vert?: boolean }) {
	const loaded = useLoaded();
	const styles = useStyles(), colors = useColors();
	const userdata = useUserData();
	let route = db.data.routes[id];
	const bg = useMemo(() => loaded && route ? route.stopIds.some(x => userdata.destinations.has(x)) ? colors.accent : (
		route.stopIds.some(x => userdata.interdestinations.has(x)) ? colors.blue : colors.muted
	) : "#000000", [userdata, loaded]) + "40";
	return <TouchableOpacity onPress={() => router.push(`/route/${id}`)}
		style={[vert ? styles.itemVert : styles.item, {
			backgroundColor: typeof arrival === "number" && arrival < 0 ? "#0000" : bg,
			boxSizing: "border-box",
			outlineColor: "red",
			outlineWidth: Number(arrival) > -1 && Number(arrival) < 20 ? 2 : 0
		}]}>
		<View style={vert ? styles.itemNoVert : styles.itemNo}>
			<Text style={[vert ? styles.itemNoTextVert : styles.itemNoText, typeof arrival === "number" && arrival < 0 && styles.muted]}>{db.data.lines[route?.lineId]?.number || "?"}</Text>
		</View>
		<View style={styles.itemData}>
			<Text style={[vert ? styles.itemTextVert : styles.itemText, typeof arrival === "number" && arrival < 0 && styles.muted]}>{route?.name}</Text>
		</View>
		{typeof arrival === "number" && arrival >= 0 && <View style={styles.itemEnd}>
			{arrival < 3600
				? <Text style={styles.itemText}>{Math.floor(arrival / 60)}:{(arrival % 60).toFixed(0).padStart(2, "0")}</Text>
				: <Text style={styles.itemText}>во {(d => d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0"))(new Date(Number(arrtime) * 1e3))}</Text>}
		</View>}
	</TouchableOpacity>;
}