export const getCurrentYearData = (data, currentYear) => {
	const currentYearData = data.filter(({date}) => date?.slice(0, 4) === currentYear);

	return currentYearData;
};
