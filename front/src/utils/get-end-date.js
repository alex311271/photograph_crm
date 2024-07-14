import { currentYear } from "../constants"

export const getEndDate = (year=currentYear, month="12", day="31") => {
	const endData = `${year}-${month}-${day}`;
	return endData
}