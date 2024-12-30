import { FlatList, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusStop from "@/components/BusStop";
import { SafeAreaView } from "react-native-safe-area-context";
import userdata from "@/lib/userdata";
import { router } from "expo-router";

export default function Index() {
	let loaded = useLoaded();
	const styles = useStyles();
	const colors = useColors();
	return <SafeAreaView style={styles.view}>
		<Text style={styles.heading}>Планер</Text>
		<TouchableOpacity style={{
			display: "flex",
			flexDirection: "row",
			padding: 15,
			paddingBottom: 0,
			borderTopColor: colors.border,
			borderTopWidth: 1,
			marginTop: 20
		}} onPress={() => router.push("/stops")}>
			<Text style={styles.text}>Дестинации</Text>
			<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
		</TouchableOpacity>
		<FlatList style={{ maxHeight: 500 }}
			data={loaded ? Array.from(userdata.destinations) : []}
			renderItem={({ item }) => <BusStop id={item} />}
			keyExtractor={String} />
		<TouchableOpacity style={{
			display: "flex",
			flexDirection: "row",
			padding: 15,
			paddingBottom: 0,
			borderTopColor: colors.border,
			borderTopWidth: 1,
			marginTop: 20
		}} onPress={() => router.push("/stops")}>
			<Text style={styles.text}>Меѓу-дестинации</Text>
			<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
		</TouchableOpacity>
		<FlatList style={{ maxHeight: 500 }}
			data={loaded ? Array.from(userdata.interdestinations) : []}
			renderItem={({ item }) => <BusStop id={item} />}
			keyExtractor={String} />
	</SafeAreaView>;
}