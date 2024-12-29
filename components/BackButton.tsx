import { useColors } from "@/hooks/stylesheet";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
	return <TouchableOpacity style={{
		position: "absolute",
		left: 10,
		top: 30,
		width: 50,
		height: 50
	}} onPress={router.back}>
		<AntDesign name="arrowleft" size={28} color={useColors().text} style={{
			position: "relative",
			top: 10,
            left: 10
		}} />
	</TouchableOpacity>;
}