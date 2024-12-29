import { useStyles } from "@/hooks/stylesheet";
import { SafeAreaView, Text } from "react-native";

export default function Settings() {
	const styles = useStyles();
	return <SafeAreaView style={styles.view}>
		<Text style={styles.text}>Settings.</Text>
	</SafeAreaView>;
}