export function nextBirthdayParts(mmddyyyy: string) {
	const [mm, dd, yyyy] = mmddyyyy.split("/").map((s) => parseInt(s, 10));
	const now = new Date();
	const currentYear = now.getFullYear();
	let next = new Date(currentYear, mm - 1, dd);
	if (next < now) next = new Date(currentYear + 1, mm - 1, dd);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const years = next.getFullYear() - yyyy;
	return {
		day: dd.toString().padStart(2, "0"),
		month: months[next.getMonth()],
		years,
	};
}
