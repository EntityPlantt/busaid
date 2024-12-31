import db from "@/lib/jspdb";
import { useEffect, useState } from "react";

export default function useLoaded() {
	const [loaded, setloaded] = useState(false);
	useEffect(() => {
		db.init().then(() => setloaded(true));
	}, []);
	return loaded;
}