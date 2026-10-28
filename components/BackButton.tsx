import { useColors, useStyles } from "@/hooks/stylesheet";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
	const styles = useStyles(), colors = useColors();
	return <TouchableOpacity style={styles.button} onPress={() => router.back()}>
		<AntDesign name="left" size={28} color={colors.text} style={styles.topBtnIcon} />
	</TouchableOpacity>;
}