import useLoaded from "@/hooks/useLoaded";
import { router } from "expo-router";

export default function index() {
	let loaded = useLoaded();
	if (loaded) router.replace("/(tabs)");
	return null;
}