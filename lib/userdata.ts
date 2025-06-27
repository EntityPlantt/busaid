import * as fs from "expo-file-system";
import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const filename = fs.documentDirectory + "userdata.json", fileopts = { encoding: "utf8" as fs.EncodingType };

const initUserData = {
	destinations: new Set<number>(),
	interdestinations: new Set<number>(),
	recentStops: [] as number[],
	recentLines: [] as number[],
	recentRoutes: [] as number[]
};

let globalSetUD = (_: typeof initUserData): void => { throw new Error("Can't use hook rn"); };

export const useUserData = singletonHook(initUserData, () => {
	const [userdata, setUserData] = useState(initUserData);
	globalSetUD = data => {
		fs.writeAsStringAsync(filename, JSON.stringify({
			...data,
			destinations: Array.from(data.destinations),
			interdestinations: Array.from(data.interdestinations)
		}), fileopts);
		console.log("Saved userdata");
		setUserData(data);
	};
	useEffect(() => {
		(async () => {
			if (!(await fs.getInfoAsync(filename)).exists) return;
			console.log("Loading userdata");
			let d = JSON.parse(await fs.readAsStringAsync(filename, fileopts));
			Object.assign(userdata, d);
			userdata.destinations = new Set;
			userdata.interdestinations = new Set;
			d.destinations.forEach((x: number) => userdata.destinations.add(x));
			d.interdestinations.forEach((x: number) => userdata.interdestinations.add(x));
			console.log("Loaded userdata", d);
			setUserData(userdata);
		})();
	}, []);
	return userdata;
});

export function setUserData(v: typeof initUserData) {
	globalSetUD(v);
}