import { ACTION_TYPE } from './action-type';

export const setFinanceData = (financeData) => ({
	type: ACTION_TYPE.SET_FINANCE_DATA,
	payload: financeData,
});
