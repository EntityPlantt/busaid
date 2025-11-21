import BusStop from "@/components/BusStop";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import useTheme from "@/hooks/useTheme";
import db from "@/lib/jspdb";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { CurvedTransition } from "react-native-reanimated";
import useLocation from "@/hooks/useLocation";

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
const DEG2RAD = Math.PI / 180;
function distance(lat: number, lon: number, lat2: number, lon2: number) {
	const a = Math.sin(DEG2RAD * (lat2 - lat) / 2) ** 2 + Math.cos(DEG2RAD * lat) * Math.cos(DEG2RAD * lat2) * Math.sin(DEG2RAD * (lon2 - lon) / 2) ** 2;
	return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Stops() {
	const loaded = useLoaded(), style = useStyles();
	const [query, setQuery] = useState("");
	const [pos, fetchLocation] = useLocation();
	return <SafeAreaView style={style.view}>
		<Searchbar placeholder="Пребарај..." value={query} onChangeText={setQuery} theme={useTheme()} style={{
			paddingHorizontal: 10,
			marginHorizontal: 10,
			marginBottom: 20,
		}} />
		<Animated.FlatList
			data={Object.values(loaded ? db.data.stops : [])
				.filter(x => (x.number + " " + x.name.toLowerCase()).includes(query.toLowerCase()))
				.sort(pos ? (a, b) => distance(a.lat, a.lon, pos.lat, pos.lon) - distance(b.lat, b.lon, pos.lat, pos.lon) : (a, b) => a.id - b.id)
				.slice(0, 50)}
			renderItem={({ item }) => <BusStop id={item.id} />}
			keyExtractor={item => item.id.toString()}
			itemLayoutAnimation={CurvedTransition.duration(500)}
			onRefresh={fetchLocation} refreshing={false} />
	</SafeAreaView>;
}