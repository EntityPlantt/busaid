import { StyleSheet } from "react-native";

const colors = {
	text: "white",
	accent: "#00c418",
	bg2: "#ffffff40"
};
const styles = StyleSheet.create({
	view: {
		color: colors.text,
		paddingTop: 100
	},
	text: {
		color: colors.text,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center"
	},
	heading: {
		color: colors.text,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center"
	},
	line: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: colors.bg2,
		minHeight: 70
	},
	lineNumber: {
		backgroundColor: colors.bg2,
		padding: 10,
		borderRadius: 10,
		height: 50,
		flexShrink: 0
	},
	lineNumberText: {
		fontSize: 30,
		color: colors.text,
	},
	lineData: {
        paddingLeft: 20
	},
	lineTime: {
		marginLeft: "auto"
	},
	lineName: {
		color: colors.text,
		fontSize: 20
	}
});

export { styles, colors };