import { colors } from "@/constants/StyleSheet";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function tab(title: string, icon: React.ComponentProps<typeof FontAwesome>["name"], route: string) {
	return <Tabs.Screen name={route} options={{
		title: title,
		tabBarIcon: ({ color }) => <FontAwesome size={28} name={icon as any} color={color} />,
		animation: "shift"
	}} />;
}
export default function RootLayout() {
	return <Tabs screenOptions={{ tabBarActiveTintColor: colors.accent, headerShown: false }}>
		{tab("Дома", "home", "index")}
		{tab("Брза проверка", "clock-o", "speedcheck")}
		{tab("Подесувања", "cog", "settings")}
	</Tabs>;
}