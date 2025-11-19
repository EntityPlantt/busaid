import { useStyles } from "@/hooks/stylesheet";
import { View } from "react-native";

/**
 * Прима ReactNodes, па null, па ReactNodes
 * ReactNodes пред null ги става лево, додека тие после null ги става десно
 */
export default function ButtonPanel({ children }: { children: React.ReactNode[] }) {
	let i = children.indexOf(null);
	const styles = useStyles();
	return <View style={styles.buttonPanel}>
		<View children={children.slice(0, i)} />
		<View />
		<View children={children.slice(i + 1)} />
	</View>;
}