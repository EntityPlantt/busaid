import { Button, FlatList, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusStop from "@/components/BusStop";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserData } from "@/lib/userdata";
import { router } from "expo-router";
import { useReducer } from "react";
import { sendHelloNotif } from "@/lib/notifications";

import "@/lib/location";

export default function Index() {
	let loaded = useLoaded();
	const styles = useStyles();
	const colors = useColors();
	const userdata = useUserData();
	const refresh = useReducer(x => !x, false)[1];
	return <SafeAreaView style={styles.view}>
		<Text style={[styles.heading, { marginBottom: 20 }]}>Планер</Text>
		<Button title="Освежи" color={colors.accent} onPress={refresh} />
		<Button title="Test notif" color={colors.accent} onPress={sendHelloNotif} />
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
		<FlatList style={{ maxHeight: 300 }}
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
		<FlatList style={{ maxHeight: 300 }}
			data={loaded ? Array.from(userdata.interdestinations) : []}
			renderItem={({ item }) => <BusStop id={item} />}
			keyExtractor={String} />
	</SafeAreaView>;
}