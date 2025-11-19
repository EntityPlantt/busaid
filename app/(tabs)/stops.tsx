import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import useTheme from "@/hooks/useTheme";
import db from "@/lib/jspdb";
import { useState } from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useLocation from "@/hooks/useLocation";

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

export default function Stops() {
	const loaded = useLoaded();
	const style = useStyles();
	const [query, setQuery] = useState("");
	const pos = useLocation();
	function distanceTo(lat: number, lon: number): number {
		return pos.lat && pos.lon ? getDistanceFromLatLonInKm(lat, lon, pos.lat, pos.lon) : 0;
	}
	return <SafeAreaView style={style.view}>
		<Searchbar placeholder="Пребарај..." value={query} onChangeText={setQuery} theme={useTheme()} style={{
			paddingHorizontal: 10,
			marginHorizontal: 10,
			marginBottom: 20
		}} />
		<FlatList
			data={Object.values(loaded ? db.data.stops : [])
				.filter(x => (x.number + " " + x.name.toLowerCase()).includes(query.toLowerCase()))
				.sort(pos.lat !== undefined ? (a, b) => distanceTo(a.lat, a.lon) - distanceTo(b.lat, b.lon) : (a, b) => a.id - b.id)
				.slice(0, 50)}
			renderItem={({ item }) => <BusStop id={item.id} />}
			keyExtractor={item => item.id.toString()} />
	</SafeAreaView>;
}