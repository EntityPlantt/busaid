import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export function useColors() {
	let theme = useTheme();
	return {
		text: theme.colors.text,
		accent: theme.colors.primary,
		muted: "#808080",
		border: theme.colors.border,
		blue: "#0040ff",
	};
};
export function useStyles() {
	let c = useColors();
	let theme = useTheme();
	return StyleSheet.create({
		view: {
			paddingTop: 20,
			paddingBottom: 60,
		},
		text: {
			color: c.text,
			fontSize: 20,
			fontWeight: "bold",
			textAlign: "center",
		},
		heading: {
			color: c.text,
			fontSize: 30,
			fontWeight: "bold",
			textAlign: "center",
		},
		item: {
			marginTop: 5,
			marginHorizontal: 10,
			padding: 5,
			flex: 1,
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: c.muted + "40",
			minHeight: 50,
			borderRadius: 20,
		},
		itemNo: {
			padding: 10,
			height: 40,
			flexShrink: 0,
			width: 60,
			borderRightColor: c.muted,
			borderRightWidth: 1,
		},
		itemNoText: {
			fontSize: 20,
			color: c.text,
			textAlign: "center",
		},
		itemData: {
			paddingHorizontal: 20,
			flexShrink: 1,
		},
		itemEnd: {
			marginLeft: "auto",
			flexShrink: 0,
			paddingRight: 10,
		},
		itemText: {
			color: c.text,
			fontSize: 20,
		},
		muted: {
			color: c.muted,
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
			color: c.text,
		},
		dropdownContainer: {
			backgroundColor: theme.colors.card,
		},
		speedKey: {
			fontSize: 50,
			height: 70,
			color: c.text,
		},
		speedCell: {
			height: 75,
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		speedRow: {
			height: 75,
		},
		button: {
			width: 50,
			height: 50,
		},
		buttonPanel: {
			paddingHorizontal: 15,
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexDirection: "row",
		},
		buttonPanelSide: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			flexGrow: 0,
			flexShrink: 0,
		},
		topBtnIcon: {
			position: "relative",
			top: 10,
			left: 10,
		},
		stopbtn: {
			display: "flex",
			flexDirection: "row",
			paddingBottom: 0,
			marginTop: 20,
			paddingHorizontal: 20,
		},
		recentList: {
			borderColor: c.muted,
			paddingVertical: 10,
			borderBottomWidth: 1,
		},
		itemVert: {
			margin: 5,
			display: "flex",
			flexDirection: "column",
			width: 125,
			borderRadius: 15,
		},
		itemNoVert: {
			backgroundColor: c.muted + "40",
			borderTopLeftRadius: 15,
			borderTopRightRadius: 15,
		},
		itemNoTextVert: {
			fontSize: 35,
			color: c.text,
			textAlign: "center",
		},
		itemTextVert: {
			color: c.text,
			textAlign: "center",
			paddingVertical: 5,
			fontSize: 12,
		},
		setting: {
			borderBottomColor: c.muted,
			borderBottomWidth: 2,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 50,
			padding: 10
		},
		settingName: {
			display: "flex",
			flexDirection: "column",
			wordWrap: "break-word",
			flexShrink: 1,
		},
	});
}