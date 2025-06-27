import * as fs from "expo-file-system";
import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const filename = fs.documentDirectory + "userdata.json", fileopts = { encoding: "utf8" as fs.EncodingType };

const initUserData = {
	destinations: [] as number[],
	interdestinations: [] as number[]
};

let globalSetUD: (x: typeof initUserData) => void = () => { throw new Error("Can't use hook rn"); };

export const useUserData = singletonHook(initUserData, () => {
	const [userdata, setUserData] = useState(initUserData);
	globalSetUD = data => {
		fs.writeAsStringAsync(filename, JSON.stringify({
			destinations: data.destinations.sort(),
			interdestinations: data.interdestinations.sort()
		}), fileopts);
		console.log("Saved userdata");
		setUserData(data);
	};
	useEffect(() => {
		(async () => {
			if (!(await fs.getInfoAsync(filename)).exists) return;
			console.log("Loading userdata");
			let d = JSON.parse(await fs.readAsStringAsync(filename, fileopts));
			userdata.destinations.length = 0;
			userdata.interdestinations.length = 0;
			userdata.destinations.push(...d.destinations);
			userdata.interdestinations.push(...d.interdestinations);
			console.log("Loaded userdata", d);
			setUserData(userdata);
		})();
	}, []);
	return userdata;
});

export function setUserData(v: typeof initUserData) {
	globalSetUD(v);
}