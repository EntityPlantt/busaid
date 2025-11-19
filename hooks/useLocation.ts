import { setUserData, useUserData } from "@/lib/userdata";
import { getLastKnownPositionAsync, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";

export default function useLocation(): [{ lat?: number, lon?: number }, () => void, () => void] {
	const [perms, req] = useForegroundPermissions();
	req();
	const userdata = useUserData(), continuous = userdata.continuousLocation;
	const [{ lat, lon }, updatePos] = useState({ lat: undefined as number | undefined, lon: undefined as number | undefined });
	async function getPos() {
		console.log(new Date().toString(), "Fetching location");
		let pos = await getLastKnownPositionAsync();
		updatePos({
			lat: pos?.coords.latitude,
			lon: pos?.coords.longitude
		});
	}
	useEffect(() => {
		console.log(perms?.granted, continuous);
		if (perms?.granted && continuous) {
			let int = setInterval(() => getPos(), 1e4);
			getPos();
			return () => clearInterval(int);
		}
	}, [perms?.granted, continuous]);
	return [{ lat, lon }, getPos, () => {
		userdata.continuousLocation = !continuous;
		setUserData();
	}];
}