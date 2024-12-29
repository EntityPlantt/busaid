import * as fs from "expo-file-system";

namespace userdata {
	const filename = fs.documentDirectory + "userdata.json", fileopts = { encoding: "utf8" as fs.EncodingType };

	export const destinations: number[] = [], interdestinations: number[] = [];

	export async function load() {
		if (!(await fs.getInfoAsync(filename)).exists) return;
		let data = JSON.parse(await fs.readAsStringAsync(filename, fileopts));
		destinations.push(...data.destinations);
		interdestinations.push(...data.interdestinations);
	}
	export async function save() {
		await fs.writeAsStringAsync(filename, JSON.stringify({ destinations, interdestinations }), fileopts);
	}
};

export default userdata;