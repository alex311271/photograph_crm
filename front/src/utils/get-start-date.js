import { currentYear } from "../constants"

export const getStartDate = (year =currentYear, month="01", day="01") => {
	const startData = `${year}-${month}-${day}`;
	return startData
}