import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import db from "./jspdb";
import { sendHelloNotif } from "./notifications";

const TASK = "background-location-task";

export const EARTH_RADIUS = 6378137, SKOPJE_ALTITUDE = 240;
export const location = {} as LocationData, locationListeners: Function[] = [];

export function radians(degrees: number) {
	return degrees * Math.PI / 180;
}
export function distance(a: Coords, b: Coords) {
	let lat1 = radians(a.latitude), lat2 = radians(b.latitude), lon1 = radians(a.longitude), lon2 = radians(b.longitude);
	let sin = Math.sin, cos = Math.cos;
	return Math.acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon2 - lon1)) * (EARTH_RADIUS + SKOPJE_ALTITUDE);
}

TaskManager.defineTask(TASK, async ({ data, error }) => {
	if (error) console.log(error);
	const { locations } = data as {
		locations: LocationData[]
	};
	if (!locations) return;
	Object.assign(location, locations.pop());
	sendHelloNotif(location.coords.latitude + ", LON: " + location.coords.longitude);
	console.log(location.coords);
	db.init().then(() => console.log(distance(location.coords, { latitude: db.data.stops[180].lat, longitude: db.data.stops[180].lon })));
	locationListeners.forEach(x => x());
});

console.log("Location following setting up");

(async () => {
	const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
	if (foregroundStatus != "granted") return;
	const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
	if (backgroundStatus != "granted") return;
	await Location.stopLocationUpdatesAsync(TASK);
	await Location.startLocationUpdatesAsync(TASK, {
		accuracy: Location.Accuracy.Highest,
		timeInterval: 1000,
		distanceInterval: 0,
		foregroundService: {
			notificationTitle: "Bus Aid ја следи Вашата локација",
			notificationColor: "#00c418",
			notificationBody: "Ова може да се исклучи во подесувања",
			killServiceOnDestroy: false
		},
		pausesUpdatesAutomatically: false,
		mayShowUserSettingsDialog: true
	}).catch(x => console.error(x));
	console.log("Set up location");
})();