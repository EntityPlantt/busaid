import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import { useUserData } from "@/lib/userdata";
import { router } from "expo-router";
import BusStop from "@/components/BusStop";
import BusRoute from "@/components/BusRoute";
import BusLine from "@/components/BusLine";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";

export default function Index() {
	const loaded = useLoaded(), styles = useStyles(), colors = useColors(), userdata = useUserData(), theme = useTheme();
	return <ScrollView>
		<LinearGradient colors={[colors.accent, colors.blue]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
			<Text style={[styles.heading, { paddingBottom: 20, paddingTop: 50, fontSize: 50, color: "white" }]}>BusAid</Text>
			<LinearGradient colors={["#0000", theme.colors.background]} style={{ height: 10 }} />
		</LinearGradient>
		<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни постојки</Text>
		<FlatList style={styles.recentList} horizontal data={loaded ? userdata.recentStops : []} renderItem={({ item }) => <BusStop id={item} vert />} />
		<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни рути</Text>
		<FlatList style={styles.recentList} horizontal data={loaded ? userdata.recentRoutes : []} renderItem={({ item }) => <BusRoute id={item} vert />} />
		<Text style={[styles.text, styles.stopbtn, { textAlign: "left" }]}>Неодамнешни линии</Text>
		<FlatList style={styles.recentList} horizontal data={loaded ? userdata.recentLines : []} renderItem={({ item }) => <BusLine id={item} vert />} />
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
	</ScrollView>;
}