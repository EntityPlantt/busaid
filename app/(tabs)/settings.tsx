import { useColors, useStyles } from "@/hooks/stylesheet";
import useThemeType from "@/hooks/useThemeType";
import db from "@/lib/jspdb";
import { setUserData, useUserData } from "@/lib/userdata";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, Button, View, Pressable, PressableProps } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { version } from "@/package.json";

const themeOptions: [string, string][] = [
	["Системска", ""],
	["Светла", "light"],
	["Темна", "dark"],
];
const continuousLocationOptions: [string, number][] = [
	["1 секунда", 1],
	["5 секунди", 5],
	["10 секунди", 10],
	["30 секунди", 30],
	["1 минута", 60],
	["5 минути", 300],
	["Исклучено", 0],
];

function Setting(args: PressableProps & { name: string, desc?: string, children?: React.ReactNode }) {
	const styles = useStyles();
	return <Pressable {...args} android_ripple={{ foreground: true }}>
		<View style={styles.setting}>
			<View style={styles.settingName}>
				<Text style={[styles.text, { textAlign: "left" }]}>{args.name}</Text>
				{args.desc && <Text style={[styles.text, styles.muted, { textAlign: "left", fontSize: 15 }]}>{args.desc}</Text>}
			</View>
			<View style={styles.settingOpt}>{args.children}</View>
		</View>
	</Pressable>;
}

function SettingDropdown<T>(attr: {
	data: [string, T][],
	value: T,
	onChange: (i: [string, T]) => void,
	renderLeftIcon?: () => React.ReactElement
}) {
	const styles = useStyles();
	return <Dropdown {...attr} labelField={0} valueField={1} style={styles.dropdown} selectedTextStyle={styles.dropdownText}
		containerStyle={styles.dropdownContainer} itemTextStyle={styles.dropdownText} />
}

export default function Settings() {
	const styles = useStyles(), colors = useColors(), userdata = useUserData();
	let themeType = useThemeType(),
		[lastFetch, setLastFetch] = useState(db.data.timestamp),
		[fetching, setFetching] = useState(false),
		[fetchingLog, setFetchingLog] = useState("");
	return <SafeAreaView style={styles.view}>
		<Text style={styles.heading}>Подесувања</Text>
		<Setting name="Тема">
			<SettingDropdown data={themeOptions} value={themeType.themeSetting ?? ""}
				onChange={i => themeType.updateTheme(i[1] || null)}
				renderLeftIcon={() => <FontAwesome size={20} color={colors.text}
					name="paint-brush" style={{ paddingRight: 10 }} />} />
		</Setting>
		<Setting name="Датабаза на автобуски станици, линии и рути" desc={fetchingLog || "Последно освежено: " + new Date(lastFetch).toLocaleString("mk")}>
			<Button title="Освежи" color={fetching ? colors.muted : colors.accent} disabled={fetching} onPress={() => {
				setFetching(true);
				db.fetchData(setFetchingLog).then(() => {
					setLastFetch(db.data.timestamp);
					setFetching(false);
				});
			}} />
		</Setting>
		<Setting name="Автоматско освежување на локација" desc="Во табот „Станици“">
			<SettingDropdown data={continuousLocationOptions} value={userdata.continuousLocation} onChange={i => {
				userdata.continuousLocation = i[1];
				setUserData();
			}} />
		</Setting>
		<Setting name="Верзија"><Text style={styles.text}>{version}</Text></Setting>
	</SafeAreaView>;
}