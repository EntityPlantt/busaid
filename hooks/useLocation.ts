import { setUserData, useUserData } from "@/lib/userdata";
import { getLastKnownPositionAsync, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";

interface Coords { lat: number, lon: number };

export default function useLocation(): [Coords | undefined, () => void] {
	const [perms, req] = useForegroundPermissions();
	const userdata = useUserData(), continuous = userdata.continuousLocation;
	const [coords, updateCoords] = useState<Coords>();
	async function getPos() {
		let pos = await getLastKnownPositionAsync();
		updateCoords(pos ? { lat: pos.coords.latitude, lon: pos.coords.longitude } : undefined);
	}
	useEffect(() => {
		if (!continuous) return;
		if (perms?.granted) {
			let int = setInterval(() => getPos(), continuous * 1e3);
			getPos();
			return () => clearInterval(int);
		}
		else if (perms === null) req();
	}, [perms === null, perms?.granted, continuous]);
	return [coords, getPos];
}