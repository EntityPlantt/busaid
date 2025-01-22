import { location, locationListeners } from "@/lib/location";
import { useEffect, useState } from "react";

export default function useLocation() {
	const [loc, setloc] = useState({ coords: {} } as LocationData);
	useEffect(() => {
		locationListeners.push(() => {
			console.log("useLocation update location");
			setloc(location);
		});
	}, []);
	return loc;
}