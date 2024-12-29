import { useColors } from "@/hooks/stylesheet";
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
	return <Tabs screenOptions={{ tabBarActiveTintColor: useColors().accent, headerShown: false }}>
		{tab("Планер", "map", "index")}
		{tab("Брза проверка", "clock-o", "speedcheck")}
		{tab("Станици", "stop-circle", "stops")}
		{tab("Подесувања", "cog", "settings")}
	</Tabs>;
}