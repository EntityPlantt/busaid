import { useColors, useStyles } from "@/hooks/stylesheet";
import useThemeType from "@/hooks/useThemeType";
import db from "@/lib/jspdb";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const themeOptions = [
	{ label: "Системска", value: "" },
	{ label: "Светла", value: "light" },
	{ label: "Темна", value: "dark" }
];

export default function Settings() {
	const styles = useStyles(), colors = useColors();
	let themeType = useThemeType(), [lastFetch, setLastFetch] = useState(db.data.timestamp), [fetching, setFetching] = useState(false);
	function themeChange(item: { label: string, value: string }) {
		themeType.updateTheme(item.value || null);
	}
	return <SafeAreaView style={styles.view}>
		<Text style={styles.heading}>Подесувања</Text>
		<Text style={[styles.text, { marginTop: 15 }]}>Тема (треба да се рестартира апликацијата да се смени)</Text>
		<Dropdown
			data={themeOptions}
			labelField="label"
			valueField="value"
			value={themeType.themeSetting ?? ""}
			onChange={themeChange}
			style={styles.dropdown}
			selectedTextStyle={styles.dropdownText}
			containerStyle={styles.dropdownContainer}
			itemTextStyle={styles.dropdownText}
			renderLeftIcon={() => <FontAwesome size={20} color={colors.text} name="paint-brush" style={{
				paddingRight: 10
			}} />} />
		<Text style={[styles.text, { marginTop: 15 }]}>Освежување на датабазата на автобуски станици, линии и рути</Text>
		<Text style={[styles.text, styles.muted, { marginBottom: 15 }]}>Последно освежено: {new Date(lastFetch).toLocaleString("mk")}</Text>
		<Button title="Освежи" color={colors.accent} disabled={fetching} onPress={() => {
			setFetching(true);
			db.fetchData().then(() => {
				setLastFetch(db.data.timestamp);
				setFetching(false);
			});
		}} />
	</SafeAreaView>;
}