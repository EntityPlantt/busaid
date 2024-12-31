import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import useTheme from "@/hooks/useTheme";
import db from "@/lib/jspdb";
import { useState } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

export default function Stops() {
	const loaded = useLoaded();
	const style = useStyles();
	const [query, setQuery] = useState("");
	return <SafeAreaView style={style.view}>
		<Searchbar placeholder="Пребарај..." value={query} onChangeText={setQuery} theme={useTheme()} style={{
			paddingHorizontal: 10,
			marginHorizontal: 10,
			marginBottom: 20
		}} />
		<FlatList
			data={Object.values(loaded ? db.data.stops : []).filter(x => (x.number + " " + x.name).toLowerCase().includes(query.toLowerCase())).slice(0, 50)}
			renderItem={({ item }) => <BusStop id={item.id} />}
			keyExtractor={item => item.id.toString()} />
	</SafeAreaView>;
}