import { request } from '../utils';
import { setFinanceData } from './set-finance-data';

export const loadFinanceAsync = (financeId) => (dispatch) => {
	request(`/finances/${financeId}`).then((financeData) => {
		if(financeData){
			dispatch(setFinanceData(financeData.data))
	};
	return financeData;
	});
};
