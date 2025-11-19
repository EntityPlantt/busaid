import { getLastKnownPositionAsync, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";

export default function useLocation() {
	const [perms, req] = useForegroundPermissions();
	req();
	const [{ lat, lon }, updatePos] = useState({ lat: 0 as number | undefined, lon: 0 as number | undefined });
	useEffect(() => {
		if (perms?.granted) {
			async function getPos() {
				let pos = await getLastKnownPositionAsync();
				updatePos({
					lat: pos?.coords.latitude,
					lon: pos?.coords.longitude
				});
			}
			let int = setInterval(getPos, 1e4);
			getPos();
			return () => clearInterval(int);
		}
	}, [perms]);
	return { lat, lon };
}