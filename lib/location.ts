import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import db from "./jspdb";

const LOCATION_TASK_NAME = "background-location-task";
TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
	if (error) {
		// Error occurred - check `error.message` for more details.
		throw error;
	}
	if (data) {
		console.log(data);
		// do something with the locations captured in the background
	}
});

console.log("Location following setting up");

(async () => {
	const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
	if (foregroundStatus !== "granted") return;
	const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
	if (backgroundStatus !== "granted") return;
	await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Highest,
	}).catch(x => console.error(x));
	console.log("Set up location");
	await db.init();
	await Location.startGeofencingAsync(LOCATION_TASK_NAME, Object.values(db.data.stops).map(x => ({
		latitude: x.lat,
		longitude: x.lon,
		radius: 10,
		identifier: "stop-" + x.id,
		notifyOnEnter: true,
		notifyOnExit: true
	})));
	console.log("Registered geofencing");
})();