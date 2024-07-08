export const getCurrentMonthData = (data, currentMonth) => {
	const currentMonthData = data.filter(({ date }) => date?.slice(5, 7) === currentMonth);
	return currentMonthData;
};
