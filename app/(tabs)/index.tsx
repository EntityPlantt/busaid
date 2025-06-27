import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserData } from "@/lib/userdata";
import { router } from "expo-router";
import BusStop from "@/components/BusStop";
import BusRoute from "@/components/BusRoute";
import BusLine from "@/components/BusLine";

export default function Index() {
	let loaded = useLoaded();
	const styles = useStyles();
	const colors = useColors();
	const userdata = useUserData();
	return <SafeAreaView>
		<ScrollView>
			<Text style={[styles.heading, { paddingVertical: 20, backgroundColor: colors.accent + "80", fontSize: 50 }]}>BusAid</Text>
			<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни постојки</Text>
			<FlatList style={styles.recentList} horizontal data={userdata.recentStops} renderItem={({ item }) => <BusStop id={item} vert />} />
			<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни рути</Text>
			<FlatList style={styles.recentList} horizontal data={userdata.recentRoutes} renderItem={({ item }) => <BusRoute id={item} vert />} />
			<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни линии</Text>
			<FlatList style={styles.recentList} horizontal data={userdata.recentLines} renderItem={({ item }) => <BusLine id={item} vert />} />
			<Text style={[styles.heading, { marginTop: 20 }]}>Планер</Text>
			<TouchableOpacity style={styles.stopbtn} onPress={() => router.push("/stops")}>
				<Text style={styles.text}>Дестинации</Text>
				<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
			</TouchableOpacity>
			{loaded && Array.from(userdata.destinations).map(x => <BusStop id={x} key={x} />)}
			<TouchableOpacity style={styles.stopbtn} onPress={() => router.push("/stops")}>
				<Text style={styles.text}>Меѓу-дестинации</Text>
				<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
			</TouchableOpacity>
			{loaded && Array.from(userdata.interdestinations).map(x => <BusStop id={x} key={x} />)}
		</ScrollView>
	</SafeAreaView>;
}