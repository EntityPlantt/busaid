import { useStyles } from "@/hooks/stylesheet";
import { SafeAreaView, Text } from "react-native";

export default function SpeedDial() {
	const styles = useStyles();
	return <SafeAreaView style={styles.view}>
		<Text style={styles.text}>Speed dial.</Text>
	</SafeAreaView>;
}