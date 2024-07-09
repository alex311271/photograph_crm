import { request } from '../utils';
import { setFinanceData } from './set-finance-data';

export const removeFinanceAsync = (financeId) => (dispatch) => {
	request(`/finances/${financeId}`, 'DELETE').then((financeData) => {
			dispatch(setFinanceData(financeData.data))
	});
};