import { useStyles } from "@/hooks/stylesheet";
import useLoaded from "@/hooks/useLoaded";
import db from "@/lib/jspdb";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, SafeAreaView, Text } from "react-native";
import { DataTable } from "react-native-paper";

export default function SpeedDial() {
	const loaded = useLoaded();
	const styles = useStyles(), [typed, setTyped] = useState("");
	if (!loaded) return null;
	function click(key: string) {
		console.log(`Clicked on ${key}`);
		if (key == "#") {
			console.log(Object.values(db.data.lines).map(x => x.number));
			let line = Object.values(db.data.lines).find(l => l.number.toUpperCase().replaceAll(/[ ПН]/g, "") == typed);
			if (line) router.push(`/line/${line.id}`);
			else;
			return;
		}
		if (key == "<") setTyped(typed.slice(0, -1));
		else setTyped(typed + key);
	}
	const keypad = ["АБВ", "123", "456", "789", "<0#"];
	return <SafeAreaView style={styles.view}>
		<Text style={[styles.heading, {
			position: "relative",
			top: Dimensions.get("window").height - keypad.length * 70 - 200,
			margin: "auto"
		}]}>{typed}</Text>
		<DataTable style={{
			position: "absolute",
			top: Dimensions.get("window").height - keypad.length * 70 - 70
		}}>
			{keypad.map(x => <DataTable.Row key={x} style={styles.speedRow}>
				{x.split("").map(y => <DataTable.Cell key={y} onPress={() => click(y)}
					style={styles.speedCell} {...(y == "<" ? { onLongPress: () => setTyped("") } : {})}>
					<Text style={styles.speedKey}>{y}</Text>
				</DataTable.Cell>)}
			</DataTable.Row>)}
		</DataTable>
	</SafeAreaView>;
}