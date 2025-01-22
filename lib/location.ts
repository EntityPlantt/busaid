import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import db from "./jspdb";
import { sendHelloNotif } from "./notifications";

const TASK = "background-location-task";

// @ts-ignore
export const location: LocationData = {}, locationListeners: Function[] = [];

TaskManager.defineTask(TASK, async ({ data, error }) => {
	if (error) console.log(error);
	const { locations } = data as {
		locations: LocationData[]
	};
	if (!locations) return;
	Object.assign(location, locations[0]);
	// sendHelloNotif(location.coords.latitude + ", LON: " + location.coords.longitude);
	console.log(location.coords);
	locationListeners.forEach(x => x());
});

console.log("Location following setting up");

(async () => {
	const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
	if (foregroundStatus !== "granted") return;
	const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
	if (backgroundStatus !== "granted") return;
	await Location.startLocationUpdatesAsync(TASK, {
		accuracy: Location.Accuracy.Highest,
	}).catch(x => console.error(x));
	console.log("Set up location");
})();