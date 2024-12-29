import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export function useColors() {
	let theme = useTheme();
	return {
		text: theme.colors.text,
		accent: "#00c418",
		bg2: "#00c41840",
		muted: "#808080"
	};
};
export function useStyles() {
	let c = useColors();
	return StyleSheet.create({
		view: {
			color: c.text,
			paddingTop: 75
		},
		text: {
			color: c.text,
			fontSize: 20,
			fontWeight: "bold",
			textAlign: "center"
		},
		heading: {
			color: c.text,
			fontSize: 30,
			fontWeight: "bold",
			textAlign: "center"
		},
		item: {
			marginTop: 20,
			paddingVertical: 10,
			paddingHorizontal: 20,
			flex: 1,
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: c.bg2,
			minHeight: 70
		},
		itemNo: {
			backgroundColor: c.bg2,
			padding: 10,
			borderRadius: 10,
			height: 50,
			flexShrink: 0
		},
		itemNoText: {
			fontSize: 30,
			color: c.text,
		},
		itemData: {
			paddingLeft: 20
		},
		itemEnd: {
			marginLeft: "auto"
		},
		itemText: {
			color: c.text,
			fontSize: 20
		},
		muted: {
			color: c.muted
		}
	});
}