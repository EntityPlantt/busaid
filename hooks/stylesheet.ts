import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export function useColors() {
	let theme = useTheme();
	return {
		text: theme.colors.text,
		accent: theme.colors.primary,
		muted: "#808080",
		border: theme.colors.border,
		blue: "#0040ff"
	};
};
export function useStyles() {
	let c = useColors();
	let theme = useTheme();
	return StyleSheet.create({
		view: {
			paddingVertical: 75
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
			backgroundColor: c.muted + "40",
			minHeight: 70
		},
		itemNo: {
			backgroundColor: c.muted + "40",
			padding: 10,
			borderRadius: 10,
			height: 50,
			flexShrink: 0,
			width: 75
		},
		itemNoText: {
			fontSize: 30,
			color: c.text,
			textAlign: "center"
		},
		itemData: {
			paddingHorizontal: 20,
			flexShrink: 1,
		},
		itemEnd: {
			marginLeft: "auto",
			flexShrink: 0
		},
		itemText: {
			color: c.text,
			fontSize: 20
		},
		muted: {
			color: c.muted
		},
		dropdown: {
			color: c.text,
			borderColor: c.border,
			borderWidth: 1,
			borderRadius: 5,
			marginHorizontal: 10,
			padding: 15,
		},
		dropdownText: {
			color: c.text
		},
		dropdownContainer: {
			backgroundColor: theme.colors.card
		},
		speedKey: {
			fontSize: 50,
			height: 70,
			color: c.text
		},
		speedCell: {
			height: 75,
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		},
		speedRow: {
			height: 75
		},
		back: {
			position: "absolute",
			left: 10,
			top: 30,
			width: 50,
			height: 50
		},
		topBtnIcon: {
			position: "relative",
			top: 10,
			left: 10
		},
		stopStar: {
			position: "absolute",
			right: 10,
			top: 30,
			width: 50,
			height: 50
		}
	});
}