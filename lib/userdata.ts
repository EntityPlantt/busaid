import { File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const filename = new File(Paths.document, "userdata.json"), fileopts = { encoding: "utf8" as "utf8" };

const initUserData = {
	destinations: new Set<number>(),
	interdestinations: new Set<number>(),
	recentStops: [] as number[],
	recentLines: [] as number[],
	recentRoutes: [] as number[],
	theme: null as string | null,
	continuousLocation: 30,
};

let globalSetUD = (): void => { throw new Error("Can't use hook rn"); };

export const useUserData = singletonHook(initUserData, () => {
	const [userdata, setUserData] = useState(initUserData);
	globalSetUD = () => {
		if (!filename.exists) filename.create();
		filename.write(JSON.stringify({
			...userdata,
			destinations: Array.from(userdata.destinations),
			interdestinations: Array.from(userdata.interdestinations)
		}), fileopts);
		setUserData(Object.assign({}, userdata));
	};
	useEffect(() => {
		(async () => {
			if (!filename.exists) return;
			let d = JSON.parse(filename.textSync());
			d.destinations = new Set(d.destinations);
			d.interdestinations = new Set(d.interdestinations);
			console.log("Loaded userdata", d);
			setUserData(Object.assign({}, userdata, d));
		})();
	}, []);
	return userdata;
});

export function setUserData() {
	globalSetUD();
}