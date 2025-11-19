import { File, Paths } from "expo-file-system";
import type { EncodingType } from "expo-file-system/build/ExpoFileSystem.types";
import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const filename = new File(Paths.cache, "userdata.json"), fileopts = { encoding: "utf8" as EncodingType };

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
		if (!filename.exists) filename.create();
		filename.write(JSON.stringify({
			...data,
			destinations: Array.from(data.destinations),
			interdestinations: Array.from(data.interdestinations)
		}), fileopts);
		console.log("Saved userdata");
		setUserData(data);
	};
	useEffect(() => {
		(async () => {
			if (!filename.exists) return;
			console.log("Loading userdata");
			let d = JSON.parse(filename.textSync());
			Object.assign(userdata, d);
			userdata.destinations = new Set(d.destinations);
			userdata.interdestinations = new Set(d.interdestinations);
			console.log("Loaded userdata", d);
			setUserData(userdata);
		})();
	}, []);
	return userdata;
});

export function setUserData(v: typeof initUserData) {
	globalSetUD(v);
}