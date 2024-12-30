import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useColors, useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import { FontAwesome } from "@expo/vector-icons";
import BusStop from "@/components/BusStop";
import { SafeAreaView } from "react-native-safe-area-context";
import userdata from "@/lib/userdata";

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
		}}>
			<Text style={styles.text}>Дестинации</Text>
			<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
		</TouchableOpacity>
		<ScrollView style={{ maxHeight: 500 }}>{(loaded ? userdata.destinations : []).map(x => <BusStop id={x} />)}</ScrollView>
		<TouchableOpacity style={{
			display: "flex",
			flexDirection: "row",
			padding: 15,
			paddingBottom: 0,
			borderTopColor: colors.border,
			borderTopWidth: 1,
			marginTop: 20
		}}>
			<Text style={styles.text}>Меѓу-дестинации</Text>
			<FontAwesome name="plus" size={28} color={colors.text} style={{ marginLeft: "auto" }} />
		</TouchableOpacity>
		<ScrollView style={{ maxHeight: 500 }}>{(loaded ? userdata.interdestinations : []).map(x => <BusStop id={x} />)}</ScrollView>
	</SafeAreaView>;
}