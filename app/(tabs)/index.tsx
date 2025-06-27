import { Button, FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusStop from "@/components/BusStop";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserData } from "@/lib/userdata";
import { router } from "expo-router";
import { useReducer } from "react";

export default function Index() {
	let loaded = useLoaded();
	const styles = useStyles();
	const colors = useColors();
	const userdata = useUserData();
	const refresh = useReducer(x => !x, false)[1];
	return <SafeAreaView>
		<ScrollView style={styles.view}>
			<Text style={styles.heading}>Планер</Text>
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