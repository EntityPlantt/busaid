import * as fs from "expo-file-system";

namespace userdata {
	const filename = fs.documentDirectory + "userdata.json", fileopts = { encoding: "utf8" as fs.EncodingType };

	export const destinations = new Set<number>(), interdestinations = new Set<number>();

	export async function load() {
		if (!(await fs.getInfoAsync(filename)).exists) return;
		console.log("Loading userdata");
		let data = JSON.parse(await fs.readAsStringAsync(filename, fileopts));
		destinations.clear();
		interdestinations.clear();
		data.destinations.forEach((x: number) => destinations.add(x));
		data.interdestinations.forEach((x: number) => interdestinations.add(x));
		console.log("Loaded userdata");
	}
	export async function save() {
		await fs.writeAsStringAsync(filename, JSON.stringify({
			destinations: Array.from(destinations),
			interdestinations: Array.from(interdestinations)
		}), fileopts);
	}
	export function reset() {
		destinations.clear();
		interdestinations.clear();
		fs.deleteAsync(filename);
	}
};

export default userdata;