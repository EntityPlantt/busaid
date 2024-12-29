import { useStyles } from "@/hooks/stylesheet";
import { View, Text } from "react-native";

export default function SpeedDial() {
	const styles = useStyles();
	return <View style={styles.view}>
		<Text style={styles.text}>Speed dial.</Text>
	</View>;
}