import { ACTION_TYPE } from '../actions';

const initialFinanceState = {
	id: '',
	date: '',
	expenseItem: '',
	sum: '',
	ownerId: '',
};

export const financeReducer = (state = initialFinanceState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FINANCE_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_FINANCE_DATA:
			return initialFinanceState;
		default:
			return state;
	}
};
