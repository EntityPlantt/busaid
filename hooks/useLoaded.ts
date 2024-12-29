import db from "@/lib/jspdb";
import userdata from "@/lib/userdata";
import { useEffect, useState } from "react";

export default function useLoaded() {
	let [loaded, setloaded] = useState(false);
	useEffect(() => {
		Promise.all([db.init(), userdata.load()]).then(() => setloaded(true));
	}, []);
	return loaded;
}