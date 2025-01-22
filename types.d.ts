type LocationData = {
	timestamp: number,
	mocked: boolean,
	coords: Coords & {
		speed: number,
		accuracy: number,
		altitude: number,
		heading: number,
		altitudeAccuracy: number
	}
};

type Coords = {
	latitude: number,
	longitude: number
};