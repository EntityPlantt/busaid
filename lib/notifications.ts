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
	importance: Notification.AndroidImportance.MAX,
	lightColor: "#00c418",
	vibrationPattern: [0, 200, 200, 200],
	description: "Testing channel",
	enableLights: true,
	enableVibrate: true,
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