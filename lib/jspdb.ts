import axios from "axios";
import * as FileSystem from "expo-file-system";

namespace db {
	export const MAX_AGE = 86400000;
	export const cachefile = FileSystem.cacheDirectory + "jspdata.json";

	export interface Translations {
		en?: string;
		al?: string;
	};
	export interface Stop {
		id: number;
		areaId: number;
		number: string;
		name: string;
		translations: Translations,
		lat: number;
		lon: number;
		note: string;
	};
	export interface Route {
		id: number;
		lineId: number;
		direction: string;
		directionTranslations: Translations,
		name: string;
		nameTranslations: Translations,
		begin: number;
		end: number;
		length: number;
		stopIds: number[];
		stopOffsets: number[];
	};
	export interface Line {
		id: number;
		kind: string;
		number: string;
		name: string;
		nightly: boolean;
		routeIds: number[];
		type: string;
		carrier: string;
	};
	export interface StopLine {
		stopId: number;
		lineId: number;
		routeId: number;
		remainingTime: number[];
	};

	const rest = axios.create({
		baseURL: "http://info.skopska.mk:8080/",
		headers: {
			Accept: "*/*",
			"Accept-Language": "en-US,en;q=0.5",
			"Accept-Encoding": "gzip,deflate",
			Referer: "http://info.skopska.mk/",
			Origin: "http://info.skopska.mk",
			Host: "info.skopska.mk:8080",
			Connection: "keep-alive",
			"User-Agent": "Mozilla/5.0 (BusAid; Android x86_64; rv:1.0) BusAid/1.0; io.github.entityplantt.busaid"
		}
	});
	export const data = {
		timestamp: Date.now(),
		token: "",
		stops: {} as { [id: string]: Stop },
		routes: {} as { [id: string]: Route },
		lines: {} as { [id: string]: Line }
	};

	export async function fetchData(dataFetchLogSetter?: React.Dispatch<React.SetStateAction<string>>) {
		if (!dataFetchLogSetter) dataFetchLogSetter = () => { };
		dataFetchLogSetter("Преземање на податоци од Скопска");
		let resp = await rest.post("/rest-auth/guests?aid=3136", { headers: { "Content-Type": "application/json" }, data: "{}" });
		data.token = resp.data;
		dataFetchLogSetter("Жетон: " + data.token);
		let req = { headers: { "eurogps.eu.sid": data.token } };
		resp = await rest.get("/rest-its/scheme/stops?filter=true", req);
		resp.data.forEach((x: Stop) => {
			data.stops[x.id] = x;
		});
		dataFetchLogSetter("Преземени станици");
		resp = await rest.get("/rest-its/scheme/routes", req);
		resp.data.forEach((x: Route) => {
			data.routes[x.id] = x;
		});
		dataFetchLogSetter("Преземени рути");
		resp = await rest.get("/rest-its/scheme/lines", req);
		resp.data.forEach((x: Line) => {
			data.lines[x.id] = x;
		});
		dataFetchLogSetter("Преземени линии");
		data.timestamp = Date.now();
		await FileSystem.writeAsStringAsync(cachefile, JSON.stringify(data), { encoding: "utf8" });
		dataFetchLogSetter("Освежено");
	}
	export async function init() {
		if ((await FileSystem.getInfoAsync(cachefile)).exists) {
			if (JSON.parse(await FileSystem.readAsStringAsync(cachefile, { encoding: "utf8" })).timestamp + MAX_AGE > Date.now()) {
				Object.assign(data, JSON.parse(await FileSystem.readAsStringAsync(cachefile, { encoding: "utf8" })));
				return;
			}
		}
		await fetchData(() => { });
	}
	export async function getStopLines(stopId: number) {
		let req = { headers: { "eurogps.eu.sid": data.token } };
		let resp = await rest.get("/rest-its/scheme/stop-lines/" + stopId, req);
		return resp.data as StopLine[];
	}
};
export default db;