import { ACTION_TYPE } from '../actions';

const initialClientState = {
	id: '',
	name: '',
	birthday: '',
	phone: '',
	email: '',
	telegram: '',
	WhatsApp: '',
	owner_id: '',
};

export const clientReducer = (state = initialClientState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CLIENT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_CLIENT_DATA:
			return initialClientState;
		default:
			return state;
	}
};
