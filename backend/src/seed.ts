import { connectDB } from "./database/database";
import { Country } from "./models/Country";

// File to seed database with small list of countries
(async () => {
	await connectDB();
	await Country.deleteMany({});
	await Country.create([
		{ name: "Portugal", code: "PT" },
		{ name: "Spain", code: "ES" },
	]);
	console.log("Seeded...");
	const all = await Country.find();
	console.log("All countries:", all);
	process.exit(0);
})();
