import { type TFunction } from "i18next";

export function nextBirthdayParts(ddmmyyyy: string, t: TFunction) {
	const [dd, mm, yyyy] = ddmmyyyy.split("/").map((s) => parseInt(s, 10));
	const now = new Date();
	const currentYear = now.getFullYear();
	let next = new Date(currentYear, mm - 1, dd);
	if (next < now) next = new Date(currentYear + 1, mm - 1, dd);

	const months = [
		t("months.january"),
		t("months.february"),
		t("months.march"),
		t("months.april"),
		t("months.may"),
		t("months.june"),
		t("months.july"),
		t("months.august"),
		t("months.september"),
		t("months.october"),
		t("months.november"),
		t("months.december"),
	];

	const years = next.getFullYear() - yyyy;
	return {
		day: dd.toString().padStart(2, "0"),
		month: months[next.getMonth()],
		years,
	};
}

export function buildGreeting(
	name: string,
	country: string,
	birthdate: string,
	t: TFunction
): string {
	const [dayStr, monthStr, yearStr] = birthdate.split("/");
	const day = parseInt(dayStr, 10);
	const month = parseInt(monthStr, 10) - 1;
	const year = parseInt(yearStr, 10);

	const today = new Date();
	let nextBirthday = new Date(today.getFullYear(), month, day);
	if (nextBirthday < today) {
		nextBirthday.setFullYear(today.getFullYear() + 1);
	}

	const nextAge = nextBirthday.getFullYear() - year;

	const months = [
		t("months.january"),
		t("months.february"),
		t("months.march"),
		t("months.april"),
		t("months.may"),
		t("months.june"),
		t("months.july"),
		t("months.august"),
		t("months.september"),
		t("months.october"),
		t("months.november"),
		t("months.december"),
	];

	const monthName = months[month];

	return t("greeting", {
		name,
		country,
		day: day.toString(),
		month: monthName,
		years: nextAge.toString(),
	});
}
