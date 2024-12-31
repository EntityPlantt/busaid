import * as fs from "expo-file-system";
import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const filename = fs.documentDirectory + "userdata.json", fileopts = { encoding: "utf8" as fs.EncodingType };

const initUserData = {
	destinations: new Set<number>(),
	interdestinations: new Set<number>()
};

let globalSetUD: (x: typeof initUserData) => void = () => { throw new Error("Can't use hook rn"); };

export const useUserData = singletonHook(initUserData, () => {
	const [userdata, setUserData] = useState(initUserData);
	globalSetUD = data => {
		fs.writeAsStringAsync(filename, JSON.stringify({
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
			userdata.destinations.clear();
			userdata.interdestinations.clear();
			d.destinations.forEach((x: number) => userdata.destinations.add(x));
			d.interdestinations.forEach((x: number) => userdata.interdestinations.add(x));
			console.log("Loaded userdata", d);
		})();
	}, []);
	return userdata;
});

export function setUserData(v: typeof initUserData) {
	globalSetUD(v);
}