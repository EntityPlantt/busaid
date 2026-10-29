import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import useTheme from "@/hooks/useTheme";
import db from "@/lib/jspdb";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { CurvedTransition } from "react-native-reanimated";
import useLocation from "@/hooks/useLocation";
import { TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
const DEG2RAD = Math.PI / 180;
function distance(lat: number, lon: number, lat2: number, lon2: number) {
	const a = Math.sin(DEG2RAD * (lat2 - lat) / 2) ** 2 + Math.cos(DEG2RAD * lat) * Math.cos(DEG2RAD * lat2) * Math.sin(DEG2RAD * (lon2 - lon) / 2) ** 2;
	return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Stops() {
	const loaded = useLoaded(), style = useStyles(), theme = useTheme();
	const [query, setQuery] = useState("");
	const [pos, fetchLocation] = useLocation();
	return <SafeAreaView style={style.view}>
		<View style={{
			paddingVertical: 10,
			paddingHorizontal: 20,
			marginHorizontal: 10,
			marginBottom: 20,
			backgroundColor: theme.colors.card,
			borderRadius: 50,
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			minHeight: 70,
		}}>
			<AntDesign name="search" color={theme.colors.text} size={25} />
			<TextInput placeholder="Пребарај..." placeholderTextColor={theme.colors.text} cursorColor={theme.colors.primary} style={{
				color: theme.colors.text,
				fontSize: 20,
				lineHeight: 40,
				marginHorizontal: 15,
				flexGrow: 1,
				// borderStyle: "dashed",
				// borderColor: theme.colors.primary,
				// borderWidth: 1,
			}} onChangeText={setQuery} />
		</View>
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