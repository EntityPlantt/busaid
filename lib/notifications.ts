import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
	async handleNotification(_) {
		return {
			shouldShowAlert: true,
			shouldPlaySound: false,
			shouldSetBadge: true
		};
	}
});

Notification.setNotificationChannelAsync("hello", {
	name: "Hello",
	description: "Testing channel",
	importance: Notification.AndroidImportance.MAX,
	enableLights: true,
	lightColor: "#00c418",
	enableVibrate: true,
	vibrationPattern: [0, 200, 200, 200],
	sound: null
});

Notification.setNotificationChannelAsync("destination", {
	name: "Дестинации",
	description: "Нотификации што се добиваат во близина на дестинација",
	importance: Notification.AndroidImportance.MAX,
	enableLights: true,
	lightColor: "#00c418",
	enableVibrate: true,
	vibrationPattern: [0, 200, 100, 100, 100, 200],
	sound: null
});

export function sendHelloNotif(content: string) {
	Notification.scheduleNotificationAsync({
		content: {
			title: "Hello!",
			body: content,
			color: "#00c418",
			data: {
				type: "hello"
			},
			sound: true,
			vibrate: [0, 200, 200, 200]
		},
		trigger: {
			channelId: "hello"
		},
	});
}

/* export function locationNotif({coords}: LocationData) {
	Notification.
} */