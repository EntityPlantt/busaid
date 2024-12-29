import BusStop from "@/components/BusStop";
import { useStyles } from "@/hooks/stylesheet";
import useTheme from "@/hooks/useTheme";
import db from "@/lib/jspdb";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

export default function Stops() {
	const style = useStyles();
	const [query, setQuery] = useState("");
	return <SafeAreaView style={style.view}>
		<Searchbar placeholder="Пребарај..." value={query} onChangeText={setQuery} theme={useTheme()} style={{
			paddingHorizontal: 10,
			marginHorizontal: 10,
			marginBottom: 20
		}} />
		<ScrollView>{Object.values(db.data.stops).filter(x => x.name.toLowerCase().includes(query.toLowerCase())).slice(0, 20).map(x => <BusStop id={x.id} key={x.id} />)}</ScrollView>
	</SafeAreaView>;
}